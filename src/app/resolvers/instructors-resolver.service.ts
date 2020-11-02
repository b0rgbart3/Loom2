import { Component, OnInit, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { ClassService } from '../services/class.service';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class InstructorsResolver implements Resolve <User[]> {

    constructor( private userService: UserService, private router: Router ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <User[]> {

        return this.userService.getAllInstructors();
    }
}
