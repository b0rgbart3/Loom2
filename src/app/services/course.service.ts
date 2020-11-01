import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../models/course.model';
import { Material } from '../models/material.model';
import { Globals } from '../../globals';


@Injectable()
export class CourseService {
  private courseCount = 0;
  private highestID = 0;
  errorMessage;
  courses: Course[];
  removedCourses: Course[];


  constructor(private http: HttpClient, private globals: Globals) {
  }


  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.globals.courses);
  }

  getCourse(id): Observable<Course> {
    return this.http.get<Course>(this.globals.course + `?courseId=${id}`);
  }

  grabCourseById( id: string ): Course {
    if (this.courses && this.courses.length > 0) {
    const grabbedCourse = this.courses.filter( course => course.courseId === id);
    if (grabbedCourse && grabbedCourse.length > 0) {
      return grabbedCourse[0];
    }
    }
  }

  // The data is coming from a component that already used a route resolver to get it,
  // so let's store it locally for heaven's sake.
  takeInResolvedData( courses: Course[] ): void {
    this.courses = courses;
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(this.globals.courses + '?id=' + courseId);
  }

  createCourse(courseObject: Course): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    // let thisID = this.courseCount + 1;

    console.log('Creating Course.');

    /* We HAVE to know what the other courses are before we build a new one (so that we can
       assign a proper ID to it. )  -- so if we haven't loaded them in yet, lets fucking do
       it again now.
    */

    if (this.courses) {
      courseObject.courseId = this.highestID.toString();
      const body = JSON.stringify(courseObject);
      console.log('Posting Course: ', body);
      return this.http.put(this.globals.courses + '?id=' + courseObject.courseId,
        courseObject, { headers: myHeaders });
    } else {
      return null;
    }
  }

  updateCourse(courseObject: Course): Observable<any> {

    console.log('In course Service: ' + JSON.stringify(courseObject));
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    const body = JSON.stringify(courseObject);
    // console.log( 'Posting Course: ', body   );
    return this.http.put(this.globals.courses + '?id=' + courseObject.courseId, courseObject, { headers: myHeaders });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    // console.log( error.message );
    return Observable.throw(error.message);

  }

  removeCourse(course: Course): Observable<any> {
    course.removeThis = true;
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    return this.http.put(this.globals.courses + '?id=' + course.courseId, course, { headers: myHeaders });

  }

  recoverCourse(courseObject): void {
    courseObject.remove_this = false;
    this.updateCourse(courseObject).subscribe(
      (data) => {
        // add this course object back into our main array
        this.courses.push(data);
        // remove this course object from our list of removed courses
        this.removedCourses.forEach( (rC, index) => {
          if (rC.courseId === data.courseId) {
            this.removedCourses.splice(index, 1);
          }
        });
        console.log('recovering course data');
        return data;
      });

  }

}





