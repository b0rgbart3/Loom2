import { Component, OnInit, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { ContentChart } from '../models/contentchart.model';
import { CourseService } from '../services/course.service';
import { ClassService } from '../services/class.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ClassModel } from '../models/classModel.model';
import { DataError } from '../models/dataerror.model';

/*
 *
 *  This Course Resolver is different from the main Course Resolver - in that
 *  It needs to get the Course ID # from the Class object that is hopefully
 *  sitting in the Activated Route Snapshot data -- rather than using an id
 *  from the URl.
 */

@Injectable({
  providedIn: 'root'
})
export class ClassCourseResolver implements Resolve <ClassModel | DataError> {

    thisClass: ClassModel;
    thisCourse: Course;

    constructor(
      private courseService: CourseService, private classService: ClassService, private router: Router,
      private activatedRoute: ActivatedRoute ) { }

    resolve( route: ActivatedRouteSnapshot): Observable <any> {

      //  console.log('In the class-course resolver: ');
        const thisClassId = route.params.id;
       // console.log('Activated class ID: ', thisClassId);
        const thisClass = route.parent.data.classes.filter( aClass => aClass.classId === thisClassId)[0];
      //  console.log('Activated route snapshot ClassObject: ', thisClass);
        return this.courseService.getCourse(thisClass.course)
        .pipe(
          catchError(err => of(err))
        );

      //   .map( thisCourse => { if (thisCourse[0]) {
      //     this.thisCourse = thisCourse[0];
      // //  console.log('Loaded course Info in the resolver: ' + JSON.stringify(this.thisCourse));
      //   return this.thisCourse;
      //   }   } ).catch( error => {
       // console.log( ' Retrieval error: course reslover. ');
    // return error; });


  }
}
