import { Component, OnInit, Output } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Course } from '../../models/course.model';
import { ClassModel } from '../../models/classModel.model';
import { Globals } from '../../../globals';
import { CourseService } from '../../services/course.service';
import { Enrollment } from '../../models/enrollment.model';
import { Assignment } from '../../models/assignment.model';
import { LoomNotificationsService } from '../../services/loom.notifications.service';
import { LoomNotification } from '../../models/loom.notification.model';
import { DataError } from '../../models/dataerror.model';
import { EnrollmentsService } from '../../services/enrollments.service';
import { AssignmentsService } from '../../services/assignments.service';


@Component({
    // moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    currentUser: User;
    errorMessage: string;
    showTaking: boolean;
    showTeaching: boolean;
    showTabs: boolean;
    takingLabel: string;
    teachingLabel: string;
    classesTakingIDList: string[];
    classesTaking: ClassModel[];
    classesTeachingIDList: string[];
    classesTeaching: ClassModel[];
    enrollments: Enrollment[];
    assignments: Assignment[];
    users: User[];
    courses: Course[];
    classes: ClassModel[];

    constructor(
        private userService: UserService,
        private classService: ClassService,
        private router: Router,
        private globals: Globals,
        private courseService: CourseService,
        private activatedRoute: ActivatedRoute,
        private notes: LoomNotificationsService,
        private enrollmentService: EnrollmentsService,
        private assignmentsService: AssignmentsService) {
    }

    ngOnInit(): void {

      //  console.log('In Home Component Init');
        this.showTabs = true;
        this.showTaking = true;
        this.showTeaching = false;
        this.takingLabel = 'tabLabelChosen';
        this.teachingLabel = 'tabLabel';
        this.currentUser = this.userService.getCurrentUser();

        console.log('The current user: ', this.currentUser);
        const resolvedUserData: User[] | DataError = this.activatedRoute.snapshot.data[`resolvedUsers`];
        const resolvedClassData: ClassModel[] | DataError = this.activatedRoute.snapshot.data[`resolvedClasses`];
        const resolvedCourseData: Course[] | DataError = this.activatedRoute.snapshot.data[`resolvedCourses`];
        const resolvedAssignmentData: Assignment[] | DataError = this.activatedRoute.snapshot.data[`resolvedAssignments`];

        let dataError = false;
        if (resolvedUserData instanceof DataError) {
            console.log(`Data loading error: ${resolvedUserData}`);
            dataError = true;
        } else {
            this.users = resolvedUserData;
            this.userService.takeInResolvedData(this.users);
        }
        if (resolvedCourseData instanceof DataError) {
            console.log(`Data loading error: ${resolvedCourseData}`);
            dataError = true;
        } else {
            this.courses = resolvedCourseData;
            this.courseService.takeInResolvedData(this.courses);
        }
        if (resolvedClassData instanceof DataError) {
            console.log(`Data loading error: ${resolvedClassData}`);
            dataError = true;
        } else {
            this.classes = resolvedClassData;
         //   console.log('classes:', this.classes);
            this.classService.takeInResolvedData(this.classes);
        }
        if (resolvedAssignmentData instanceof DataError) {
            console.log(`Data loading error: ${resolvedAssignmentData}`);
            dataError = true;
        } else {
            this.assignments = resolvedAssignmentData;
            this.assignmentsService.takeInResolvedData(this.assignments);
        }

        if (!dataError) {
            //  console.log('Got all the data.');
            this.userService.createInstructorsDataObject(this.users, this.assignments, this.classes, this.courses);
        }


       // console.log('Got routed to the home component.');
        const resolvedEnrollmentData: Enrollment[] | DataError = this.activatedRoute.snapshot.data[`resolvedEnrollments`];


        if (resolvedEnrollmentData instanceof DataError) {
            console.log(`Data loading error: ${resolvedEnrollmentData}`);
            dataError = true;
        } else {
            this.enrollments = resolvedEnrollmentData;
            this.enrollmentService.takeInResolvedData(this.enrollments);
        }

       // console.log('Enrollments: ', this.enrollments);
        if (this.enrollments) {
            const enrollmentsForCurrentUser = this.enrollments.filter( (enrollment) => enrollment.userId === this.currentUser.userId );

            this.classesTakingIDList = enrollmentsForCurrentUser.map( (enrollment) =>
                enrollment.classId
            );


        }


        // console.log('Classes Taking ID List: ', this.classesTakingIDList);

        // Ask the class service for a class object for each id in that array
        if (this.classesTakingIDList && this.classesTakingIDList.length > 0) {
            this.classesTaking = this.classesTakingIDList.map(classID => this.classService.getClassFromMemory(classID));

            console.log('Classes Taking: ', this.classesTaking);
        } else {
            this.classesTaking = null;
        }
        // console.log('TAKING: ' + JSON.stringify(this.classesTaking));

        // this.assignments = this.activatedRoute.snapshot.data.assignments;
        // const resolvedAssignmentData: Assignment[] | DataError = this.activatedRoute.snapshot.data[`resolvedAssignments`];

        // if (resolvedAssignmentData instanceof DataError) {
        //     console.log(`Data loading error: ${resolvedAssignmentData}`);
        //     dataError = true;
        // } else {
        //     this.assignments = resolvedAssignmentData;
        //     this.assignmentService.takeInResolvedData(this.assignments);
        // }

        // console.log('Assignments: ', this.assignments);

        if (this.assignments) {
            const classesCurrentUserIsTeaching = this.assignments.filter( (assignment) => assignment.userId === this.currentUser.userId );


            this.classesTeachingIDList = classesCurrentUserIsTeaching.map(assignment => assignment.classId);
        }
        console.log('Classes Teaching ID List: ', this.classesTeachingIDList);
        this.classesTeaching = [];
        if (this.classesTeachingIDList && this.classesTeachingIDList.length > 0) {
            this.classesTeachingIDList.forEach((classID) =>
             {
                this.classes.filter( classObject => {
                    if (classObject.classId === classID) {
                 this.classesTeaching.push( classObject ); }
                    });

            });
        } else {
            this.classesTeaching = null;
        }

        console.log('classesTeaching: ', this.classesTeaching);

        if ((this.classesTaking === null) && (this.classesTeaching !== null)) {
            this.showTeaching = true;
            this.showTabs = false;
        }

        if ((this.classesTeaching === null) && (this.classesTaking !== null)) {
            this.showTaking = true;
            this.showTabs = false;
        }

        if ((!this.classesTaking) && (this.classesTeaching === null)) {
            this.showTaking = false;
            this.showTabs = false;
            this.showTeaching = false;

        }

        if (!this.showTeaching && !this.showTaking) {
            this.router.navigate(['/']);
            const thisNotification = new LoomNotification('success',
                ['You are not yet registered for classes'], 3000);
            this.notes.add(thisNotification);
        }
    }


    taking(): void {
        // console.log('change to taking.');
        this.showTaking = true;
        this.showTeaching = false;
        this.takingLabel = 'tabLabelChosen';
        this.teachingLabel = 'tabLabel';
    }
    teaching(): void {
        // console.log('change to teaching.');
        this.showTaking = false;
        this.showTeaching = true;
        this.takingLabel = 'tabLabel';
        this.teachingLabel = 'tabLabelChosen';
    }


    goto(queryID): void {
        const queryString = '/classes/' + queryID + '/0';
        console.log('Routing to: ' + queryString );
        this.router.navigate([queryString]);
    }
}
