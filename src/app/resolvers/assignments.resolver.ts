import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Assignment } from '../models/assignment.model';
import { AssignmentsService } from '../services/assignments.service';
import { DataError } from '../models/dataerror.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsResolver implements Resolve<Assignment[] | DataError> {

  constructor(
    private assignmentService: AssignmentsService ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Assignment[] | DataError> {
    // Angular automatially subscribes to this get request
    // because it is in a "Resolver".

    return this.assignmentService.getAssignments()
    .pipe(
      catchError(err => of(err))
    );
  }

}
