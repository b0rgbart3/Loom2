import { Component, OnInit, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ClassService } from '../services/class.service';
import { UserService } from '../services/user.service';
import { NotesSettings } from '../models/notessettings.model';
import { NotesService } from '../services/notes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataError } from '../models/dataerror.model';

@Injectable({
    providedIn: 'root'
  })

export class NotesSettingsResolver implements Resolve <NotesSettings | DataError> {

    constructor(
        private notesService: NotesService,
        private classService: ClassService, private router: Router,
        private userService: UserService ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable <NotesSettings> {
        const classId = route.params.id;
        const userId = this.userService.getCurrentUser().id;
        const section = route.params.id2 + '';
   //     console.log('In the notes settings resolver - class: ' + class_id +
   //         ', section: ' + section + ', user: ' + user_id);

        return this.notesService.getNotesSettings(userId, classId, section)
        .pipe(
            catchError(err => of(err))
          );
    //     .
    //     map(nsObject => { if (nsObject) {
    //      //   console.log('found existing ns object.');
    //     return nsObject; } else {
    //         const newNSObject = new NotesSettings( user_id, class_id, section, true, []);
    //             console.log('did not find ns object, so creating one:' + JSON.stringify(newNSObject));

    //     // const returnableArray = [];
    //     // returnableArray.push(newDSObject);
    //    // console.log('returning: ' + JSON.stringify(returnableArray));
    //     return newNSObject;
    //         }
    //      })
    // .catch( error => {
    //     console.log(`DS Retrieval error: ${error}`);
    //     return Observable.of(null);
    // });
    }


}
