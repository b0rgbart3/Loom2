import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { ClassModel } from '../../models/classModel.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
// import { UserService } from '../services/user.service';
// import { ClassService } from '../services/class.service';
import { Course } from '../../models/course.model';
import { Assignment } from '../../models/assignment.model';
import { UserService } from '../../services/user.service';
import { ClassService } from '../../services/class.service';
import { CourseService } from '../../services/course.service';
import { AssignmentsService } from '../../services/assignments.service';

import { DataError } from '../../models/dataerror.model';

@Component({
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.css']
})

export class WelcomeComponent implements OnInit {
    username;
    currentUser: User;
    users: User[];
    classes: ClassModel[];
    courses: Course[];
    assignments: Assignment[];
    instructorsByClass: any[];
    errorMessage: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private classService: ClassService,
        private courseService: CourseService,
        private assignmentsService: AssignmentsService,
        private activatedRoute: ActivatedRoute) {

    }

    login(): void {
        this.router.navigate(['/login']);
    }

    ngOnInit(): void {

        this.currentUser = this.userService.getCurrentUser();
        console.log('In Welcome, currentUser: ', this.currentUser );
        //  this.users = this.userService.grabUsers();
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
            console.log('Got all the data.');
            this.userService.createInstructorsDataObject(this.users, this.assignments, this.classes, this.courses);
        }
        // this.classes = [];
        // this.activatedRoute.data.subscribe(
        //     data => {
        //         //   console.log('got data: ' + JSON.stringify(data));
        //         this.grabData();
        //     }, err => {
        //         // console.log('error retrieving data');
        //     }, () => {
        //         // console.log('Data finished: ');
        //         this.grabData();
        //     }
        // );

        // If the route didn't resolve this data, then let's load it in syncronously.
        if (!this.classes || this.classes.length < 1) {
            this.classService.getClasses().subscribe(
                data => this.classes = data,
                error => console.log('error getting class info'),
                () => console.log('back from loading classes')
            );
        }

    }

    grabData(): void {
        //  this.courses = this.activatedRoute.snapshot.data.courses;
        //  this.classes = this.activatedRoute.snapshot.data.classes;
        // console.log('Classes: ' + JSON.stringify(this.classes));
        // this.assignments = this.activatedRoute.snapshot.data.assignments;
        this.loadInstructors();
    }
    loadInstructors(): void {
        this.instructorsByClass = [];

        // if (this.classes) {
        // for (let i = 0; i < this.classes.length; i++) {
        //     this.instructorsByClass[i] = [];
        //     this.userService.getInstructorsForClass(this.classes[i].id).subscribe(data => this.instructorsByClass[i] = data,
        //         err => console.log('error getting instructors'));
        // }
        // for (let i = 0; i < this.instructorsByClass.length; i++) {
        //     // these are assignment objects
        //     for (let j = 0; j < this.instructorsByClass[i].length; j++) {
        //         this.instructorsByClass[i][j].user = this.userService.getUserFromMemoryById(this.instructorsByClass[i][j].userId);
        //     }
        // }
        //  }
    }
}
