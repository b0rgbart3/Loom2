import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { DataError } from '../models/dataerror.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<Course[] | DataError> {

  constructor(
    private courseService: CourseService ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course[] | DataError> {
    // Angular automatially subscribes to this get request
    // because it is in a "Resolver".

    return this.courseService.getCourses()
    .pipe(
      catchError(err => of(err))
    );
  }

}
