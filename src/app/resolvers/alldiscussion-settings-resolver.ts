import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DiscussionSettings } from '../models/discussionsettings.model';
import { DiscussionService } from '../services/discussion.service';
import { DataError } from '../models/dataerror.model';

@Injectable({
    providedIn: 'root'
  })

export class AllDiscussionSettingsResolver implements Resolve <DiscussionSettings[] | DataError> {

    constructor(
        private ds: DiscussionService ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable <DiscussionSettings[] | DataError> {
      //  console.log('IN the ALL DS Resolver.');

        return this.ds.getAllDiscussionSettings()
        .pipe(
            catchError(err => of(err))
        );
    }
}
