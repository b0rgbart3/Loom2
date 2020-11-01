import { Component, OnInit, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';
import { Announcements } from '../models/announcements.model';
import { AnnouncementsService } from '../services/announcements.service';
import { DataError } from '../models/dataerror.model';

@Injectable({
    providedIn: 'root'
  })
// get the enrollments that the currentUser is a student in

export class AllAnnouncementsResolver implements Resolve <Announcements[] | DataError> {

    announcements: Announcements[];
    constructor(
        private router: Router, private announcementsService: AnnouncementsService,
        private classService: ClassService, private userService: UserService ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <Announcements[]> {

       // console.log('IN STUDENT ENROLLMENTS RESOLVER');
        return this.announcementsService.getAllAnnouncements()
        .pipe(
            catchError(err => of(err))
          );

    //     .map( data => { this.announcements = data;
    //     // console.log('got data back from the API for enrollments: ' + JSON.stringify(data));
    // return this.announcements; })
    // .catch(error => {
    //     // this.router.navigate(['/welcome']);
    //     return Observable.of(null);
  //  });
    }


}
