import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { DataError } from '../models/dataerror.model';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<User[] | DataError> {

  constructor(
    private userService: UserService ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[] | DataError> {
    // Angular automatially subscribes to this get request
    // because it is in a "Resolver".

    return this.userService.getUsers()
    .pipe(
      catchError(err => of(err))
    );
  }

}
