import { Component, OnInit, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Announcements } from '../models/announcements.model';
import { AnnouncementsService } from '../services/announcements.service';
import { DataError } from '../models/dataerror.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsResolver implements Resolve <Announcements[] | DataError> {

    constructor( private announcementsService: AnnouncementsService, private router: Router ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <Announcements[] | DataError> {

        const id = route.params.id;

        console.log('In announcements Resolver...');
        return this.announcementsService.getObjects(id)
        .pipe(
          catchError(err => of(err))
        );

    //     map(objects => { if (objects) {
    //         console.log('found announcements: ' + JSON.stringify(objects));
    //         return objects; }
    //     return null; })
    // .catch(error => {
    //     return Observable.of(null);
    // });

  }
}
