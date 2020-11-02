import { Component, OnInit, SecurityContext, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Globals } from '../../../globals';
import { Enrollment } from '../../models/enrollment.model';
import { ClassModel } from '../../models/classModel.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ClassService } from '../../services/class.service';
import { EnrollmentsService } from '../../services/enrollments.service';


@Component({
    selector: 'app-enrollments-component',
    // moduleId: module.id,
    templateUrl: 'enrollments.component.html',
    styleUrls: ['enrollments.component.css']
})

export class EnrollmentsComponent implements OnInit {
    enrollmentsWithUserObjects: [{}];
    enrollmentForm: FormGroup;
    feedback: string;
    @Input() users: User[];
    @Input() enrollments: Enrollment[];
    @Input() classes: ClassModel[];


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private globals: Globals, private userService: UserService, private enrollmentsService: EnrollmentsService,
        private classService: ClassService) { }

    // The form control names match the Enrollment Data Model.  Nice!

    ngOnInit(): void {
        this.enrollmentsWithUserObjects = [{}];
        console.log('made it into the enrollments component.');
        this.enrollments.map((enrollment) => {
            const userObject = this.userService.getUserFromMemoryById(enrollment.userId);
            const enrollmentWithUserObject = { user: userObject, enrollment};
            this.enrollmentsWithUserObjects.push( enrollmentWithUserObject );
        });
        this.feedback = '';
        this.enrollmentForm = this.fb.group({
            userId: ['', Validators.required],
            classId: ['', Validators.required],
        });

        console.log('In enrollments, classes: ', this.classes);
    }

    unique(object): boolean {
        // We don't want to have a duplicate in the DB
        let unique = true;
        this.enrollments.forEach( (enrollment) => {
            if (object.userId === enrollment.userId) {
                if (object.classId === enrollment.classId) {
                    unique = false;

                }
            }
        });
        return unique;
    }

    trash(index): void {
        console.log('about to delete: ' + JSON.stringify(this.enrollments[index]));
        const result = confirm('Are you sure you want to un-enroll ' + this.enrollments[index].thisUser.username + ' from ' +
            this.classService.getClassFromMemory(this.enrollments[index].classId).title + '?');
        if (result) {
            this.enrollmentsService.remove(this.enrollments[index].id).subscribe(
                data => { },
                error => {
                    if (error.status === 200) {
                        console.log('Got BOGUS Error message.');
                        this.enrollments.splice(index, 1);
                    } else {
                        console.log('Error: ' + JSON.stringify(error));
                    }
                }
            );
        }
    }

    postEnrollment(): void {
        if (this.enrollmentForm.dirty && this.enrollmentForm.valid) {
            // This is Deborah Korata's way of merging our data model with the form model
            const comboObject = Object.assign({}, {}, this.enrollmentForm.value);
            const chosenUser = this.userService.getUserFromMemoryById(comboObject.userId);
            const chosenClass = this.classService.getClassFromMemory(comboObject.classId);

            if (!this.unique(comboObject)) {
                console.log('NOT unique: ' + JSON.stringify(comboObject));
                this.enrollmentForm.reset();
                this.feedback = chosenUser.username + ' is already enrolled in ' + chosenClass.title;
                console.log(this.feedback);
            } else {
                this.feedback = '';
                this.enrollmentsService.postEnrollment(comboObject).subscribe(
                    (val) => {

                    },
                    response => {
                    },
                    () => {
                        this.enrollmentForm.reset();

                        comboObject.this_user = chosenUser;
                        comboObject.this_class = chosenClass;
                        // this.enrollments.push( comboObject );

                        // console.log('Enrollments: ' + JSON.stringify(this.enrollments));
                        //  this.loadInEnrollments();
                    }
                );
            }
        }
    }
}
