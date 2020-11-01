import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Globals } from '../../globals';


import { Enrollment } from '../models/enrollment.model';
import { UserService } from './user.service';
import { Assignment } from '../models/assignment.model';
import { DataError } from '../models/dataerror.model';


@Injectable()
export class AssignmentsService {

  enrollmentCount = 0;
  highestID = 0;
  assignments: Assignment[];
  errorMessage: string;

  constructor(private http: HttpClient, private globals: Globals, private userService: UserService) { }

  getAssignmentsForClass( classId: string): Assignment[] {
    if (this.assignments) {
      const assignmentsForClass = this.assignments.filter( (asmnt) => asmnt.classId === classId);
      return assignmentsForClass;
    } else {
      return null;
    }
  }

  takeInResolvedData( assignments: Assignment[]): void {
    this.assignments = assignments;
  }

  getAssignmentsNow(): void {
    this.getAssignments().subscribe(
      data => this.assignments = data,
      error => this.errorMessage = error);
  }

  getAssignmentsInClass(classID): Observable<any> {
    return this.http.get<Assignment[]>(this.globals.assignments +
      '?classId=' + classID);
  }

  getAssignments(): Observable<any> {
    return this.http.get<Assignment[]>(this.globals.assignments)
    .pipe(
      catchError(err => this.handleHttpError(err))
    );
  }


  private handleHttpError(error: HttpErrorResponse): Observable<DataError> {
    const dataError = new DataError(100, error.message, 'An error occcurred retrieving data.');

    return throwError(dataError);

  }

  // Return the list of instructor assignments for the current user
  // getAssignment(id): Observable<any> {
  //   return this.http.get<Assignment[]>(this.globals.assignments +
  //     '?userId=' + this.userService.getCurrentUser().id);
  // }


  postAssignment(assignment): Observable<Enrollment> {

    assignment.id = this.getNextId();
    // console.log('New id =' + classObject.id);
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    // if (!this.assignments) { this.assignments = []; }
    // this.assignments.push(assignment);

    return this.http.put(this.globals.assignments + '?id=' + assignment.id, assignment, { headers: myHeaders }) as Observable<Enrollment>;

  }

  remove(assignmentId): Observable<any> {

    console.log('In the service, calling delete: ' + assignmentId);
    const urlstring = this.globals.assignments + '?id=' + assignmentId;
    console.log('urlstring: ' + urlstring);
    return this.http.delete(urlstring);
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
    if (this.assignments && this.assignments.length > 0) {

      this.assignments.forEach(assignment => {
        const foundID = Number(assignment.assignmentId);
        // console.log('Found ID: ' + foundID);
        if (foundID >= this.highestID) {
          const newHigh = foundID + 1;
          this.highestID = newHigh;
          // console.log('newHigh == ' + newHigh);
        }
      });

    } else {
      console.log('The ASSIGNMETS SERVICE HAS NO ASSINGMENTS!');
      this.highestID = 1;
    }
  }




}




