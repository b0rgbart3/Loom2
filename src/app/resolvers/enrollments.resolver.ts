import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { DataError } from '../models/dataerror.model';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentsService } from '../services/enrollments.service';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentsResolver implements Resolve<Enrollment[] | DataError> {

    constructor(
        private enrollmentsService: EnrollmentsService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Enrollment[] | DataError> {
        // Angular automatially subscribes to this get request
        // because it is in a "Resolver".

        return this.enrollmentsService.getAllEnrollments()
            .pipe(
                catchError(err => of(err))
            );
    }

}
