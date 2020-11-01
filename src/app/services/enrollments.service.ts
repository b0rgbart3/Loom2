import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';


import { Enrollment } from '../models/enrollment.model';
import { UserService } from './user.service';
import { Assignment } from '../models/assignment.model';


@Injectable()
export class EnrollmentsService {

  enrollmentCount = 0;
  highestID = 0;
  enrollments: Enrollment[];
  errorMessage: string;

  constructor(private http: HttpClient, private globals: Globals, private userService: UserService) { }



  takeInResolvedData(enrollments: Enrollment[]): void {
    this.enrollments = enrollments;
  }

  getEnrollmentsNow(): void {
    this.getEnrollments().subscribe(
      data => this.enrollments = data,
      error => this.errorMessage = error);
  }

  getEnrollmentsInClass(classID): Observable<any> {
    return this.http.get<Enrollment[]>(this.globals.enrollments + '?classId=' + classID);
    //      .do(data => data).catch(this.handleError);
  }
  // Get a list of student ID#s that are in this class.
  // getStudentsInClass( classID ): string[] {
  //   const studentIDList = this.enrollments.map( enrollment =>  {
  //     if ((enrollment.classId === classID)) {
  //       return enrollment.userId;
  //     }
  //   });
  //   return studentIDList;
  // }

  getAllEnrollments(): Observable<any> {
    return this.http.get<Enrollment[]>(this.globals.enrollments);
    // .do(data => {
    //   this.enrollments = data;
    //   return data;
    // }).catch(this.handleError);

  }
  // Return the list of student enrollments for the current user
  getEnrollments(): Observable<any> {
  const user = this.userService.getCurrentUser();
  if (user) {
    return this.http.get<Enrollment[]>(this.globals.enrollments + '?userId=' +
      user.userId); } else {
        return null;
      }

    // .do(data => {
    //   return data;
    // }).catch(this.handleError);

  }



  postEnrollment(enrollment): Observable<{}> {

    enrollment.id = this.getNextId();
    console.log('New id =' + enrollment.id);
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    if (!this.enrollments) { this.enrollments = []; }
    this.enrollments.push(enrollment);

    console.log('About to place put request for: ' + JSON.stringify(enrollment));
    return this.http.put(this.globals.enrollments + '?id=0', enrollment, { headers: myHeaders });
    // .map(() => enrollment).catch(this.handleError);

  }

  remove(enrollmentId): Observable<any> {

    // console.log('In the service, calling delete: ' + enrollment_id);
    const urlstring = this.globals.enrollments + '?id=' + enrollmentId;
    // console.log('urlstring: ' + urlstring);
    return this.http.delete(urlstring);
    // .do(data => data);
  }

  getNextId(): string {

    this.updateIDCount();
    return this.highestID.toString();

  }


  private handleError(error: HttpErrorResponse): string {
    console.log('ERROR:');
    console.log(JSON.stringify(error));
    return error.message;

  }

  updateIDCount(): void {
    // Loop through all the Materials to find the highest ID#
    if (this.enrollments && this.enrollments.length > 0) {

      this.enrollments.forEach(enrollment => {
        const foundID = Number(enrollment.enrollmentId);
        if (foundID >= this.highestID) {
          const newHigh = foundID + 1;
          this.highestID = newHigh;

        }
      });
    } else { this.highestID = 1; }
  }




}




