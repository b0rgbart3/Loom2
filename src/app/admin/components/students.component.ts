import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Globals } from '../../../globals';
import { Enrollment } from '../../models/enrollment.model';
import { ClassModel } from '../../models/classModel.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ClassService } from '../../services/class.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DataError } from 'src/app/models/dataerror.model';

@Component({
  //  moduleId: module.id,
    templateUrl: 'students.component.html',
    styleUrls: ['students.component.css']
})

export class StudentsComponent implements OnInit {


    users: User[];
    enrollments: Enrollment[];
    classes: ClassModel[];
    dataError = false;
    constructor(
        private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private globals: Globals, private userService: UserService, private enrollmentsService: EnrollmentsService,
        private classService: ClassService) { }


    ngOnInit(): void {


        this.activatedRoute.data.subscribe(
            data => {
                console.log('Got new data!');
                this.users = data.users;

                this.dataError = false;

                const resolvedUserData: User[] | DataError = this.activatedRoute.snapshot.data[`users`];

                if (resolvedUserData instanceof DataError) {
                    console.log(`Data loading error: ${resolvedUserData}`);
                    this.dataError = true;
                } else {
                    this.users = resolvedUserData;
                    this.userService.takeInResolvedData(this.users);
                }
                // console.log('Users: ', this.users);

                const resolvedEnrollmentData: Enrollment[] | DataError = this.activatedRoute.snapshot.data[`enrollments`];

                if (resolvedEnrollmentData instanceof DataError) {
                    console.log(`Data loading error: ${resolvedEnrollmentData}`);
                    this.dataError = true;
                } else {
                    this.enrollments = resolvedEnrollmentData;
                    this.enrollmentsService.takeInResolvedData(this.enrollments);
                }
                // console.log('Enrollments: ', this.enrollments);

                const resolvedClassData: ClassModel[] | DataError = this.activatedRoute.snapshot.data[`classes`];

                if (resolvedClassData instanceof DataError) {
                    console.log(`Data loading error: ${resolvedClassData}`);
                    this.dataError = true;
                } else {
                    this.classes = resolvedClassData;
                    this.classService.takeInResolvedData(this.classes);
                }
                // console.log('Classes: ', this.classes);


            }

        );

    }

}
