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

@Component({
  //  moduleId: module.id,
    templateUrl: 'students.component.html',
    styleUrls: ['students.component.css']
})

export class StudentsComponent implements OnInit {


    users: User[];
    enrollments: Enrollment[];
    classes: ClassModel[];
    constructor(
        private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private globals: Globals, private userService: UserService, private enrollmentsService: EnrollmentsService,
        private classService: ClassService) { }


    ngOnInit(): void {
        this.activatedRoute.data.subscribe(
            data => {
                //   console.log('Got new data!');
                this.users = data.users;
                this.enrollments = data.enrollments;
                this.classes = data.classes;
                //   console.log('Users: ' + JSON.stringify(this.users));
            }

        );

    }

}
