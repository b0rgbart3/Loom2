import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClassModel } from '../models/classModel.model';
import { ClassService } from '../services/class.service';
import { DataError } from '../models/dataerror.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesResolver implements Resolve<ClassModel[] | DataError> {

  constructor(
    private classService: ClassService ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClassModel[] | DataError> {
    // Angular automatially subscribes to this get request
    // because it is in a "Resolver".

    return this.classService.getClasses()
    .pipe(
      catchError(err => of(err))
    );
  }

}
