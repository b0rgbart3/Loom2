import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Globals } from '../../../globals';
import { Enrollment } from '../../models/enrollment.model';
import { ClassModel } from '../../models/classModel.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ClassService } from '../../services/class.service';
import { AssignmentsService } from '../../services/assignments.service';
import { Assignment } from '../../models/assignment.model';


@Component({
   // moduleId: module.id,
    selector: 'app-assignments-component',
    templateUrl: 'assignments.component.html',
    styleUrls: ['assignments.component.css']
})

export class AssignmentsComponent implements OnInit {
    form: FormGroup;
    assignments: Assignment[];
    assignmentsWithUserObjects: [{}];
    instructors: User[];
    classes: ClassModel[];
    users: User[];
    feedback: string;



    constructor(
        private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private globals: Globals, private userService: UserService, private assignmentsService: AssignmentsService,
        private classService: ClassService) { }

    // The form control names match the Enrollment Data Model.  Nice!

    ngOnInit(): void {

        this.activatedRoute.data.subscribe(
            data => {
                //  console.log('Got new data!');
                this.assignments = data.assignments;
                console.log('In assignmentsComponent: Assignments: ', this.assignments);
                this.classes = data.classes;
                this.users = data.users;
                this.instructors = data.instructors;

                this.assignmentsWithUserObjects = [{}];
                console.log('made it into the enrollments component.');
                this.assignments.map((assignment) => {
                    const userObject = this.userService.getUserFromMemoryById(assignment.userId);
                    const assignmentWithUserObject = { user: userObject, assignment};
                    this.assignmentsWithUserObjects.push( assignmentWithUserObject );
                });
                this.assignmentsWithUserObjects.shift(); // lose the empty initial object;
                console.log('assignmentsWith User Objects: ', this.assignmentsWithUserObjects);
            }
        );

        this.form = this.fb.group({
            userId: ['', Validators.required],
            classId: ['', Validators.required],
        });

    }


    unique(object): boolean {
        // We don't want to have a duplicate in the DB
        let unique = true;

        this.assignments.forEach( (assignment) => {
            if (object.userId === assignment.userId) {
                if (object.classId === assignment.classId) {

                    unique = false;

                }
            }
        });

        return unique;
    }

    trash(index): void {
        let nameOfPerson = '';
        if (this.assignments && this.assignments[index] && this.assignments[index].thisUser) {
            nameOfPerson = this.assignments[index].thisUser.username;
        }
        let classTitle = '';
        if (this.assignments && this.assignments[index] && this.assignments[index].thisClass) {
            classTitle = this.assignments[index].thisClass.title;
        } else {
            console.log('class: ' + JSON.stringify(this.assignments[index].thisClass));
        }
        // console.log('about to delete: ' + JSON.stringify(this.assignments[index]));
        const result = confirm('Are you sure you want to un-assign ' + nameOfPerson +
            ' from teaching ' + classTitle + '?');
        if (result && this.assignments[index]) {
            this.assignments.splice(index, 1);
            this.assignmentsService.remove(this.assignments[index].id).subscribe(
                data => { },
                error => {
                    if (error.status === 200) {
                        console.log('Got BOGUS Error message.');
                    } else {
                        console.log('Error: ' + JSON.stringify(error));
                    }

                    // this.loadInAssignments();
                }
            );
        }
    }
    loadInAssignments(): void {
        this.assignmentsService.getAssignments().subscribe(
            data => {
                this.assignments = data;
                if (this.assignments) {
                    this.assignments.map(enrollment => {
                        enrollment.thisUser = this.userService.getUserFromMemoryById(enrollment.userId);
                        enrollment.thisClass = this.classService.getClassFromMemory(enrollment.classId);
                    });
                }
                console.log(' Enrollments: ' + JSON.stringify(data));
            },
            error => console.log('error getting enrollments after post.'),
            () => {
                console.log('Instructor Assignments: ' + JSON.stringify(this.assignments));
                // this.assignUserObjects();
                console.log('done getting new assignments');
                // this.router.navigate(['/enrollments/instructors']);

            }
        );
    }

    postAssignment(): void {
        if (this.form.dirty && this.form.valid) {

            // This is Deborah Korata's way of merging our data model with the form model
            const comboObject = Object.assign({}, {}, this.form.value);
            const chosenUser = this.userService.getUserFromMemoryById(comboObject.userId);
            const chosenClass = this.classService.getClassFromMemory(comboObject.classId);

            if (!this.unique(comboObject)) {
                this.form.reset();
                this.feedback = chosenUser.username + ' is already assigned to teach ' + chosenClass.title;

            } else {

                this.assignmentsService.postAssignment(comboObject).subscribe(
                    (val) => {
                        console.log('got val back');
                    },
                    response => {
                        console.log('got resonse back');
                    },
                    () => {
                        console.log('got back from posting.');

                        this.form.reset();
                        this.feedback = null;

                        // Add this new assignment to our main enrollments data object!  There's an idea!
                        comboObject.thisUser = chosenUser;
                        comboObject.thisClass = chosenClass;
                        this.assignments.push(comboObject);
                        // this.loadInEnrollments();
                        //  this.router.navigate(['/enrollments/instructors']);


                    }
                );
            }
        }
    }
}
