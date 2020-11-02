import { Injectable, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import { LoomNotificationsService } from './loom.notifications.service';
import { Globals } from '../../globals';
import { NotesSettings } from '../models/notessettings.model';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  responseType: 'text'
};

@Injectable()


export class NotesService {



  constructor(
    private http: HttpClient,
    private globals: Globals) {

  }


  getNotesSettings(userId, classId, section): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    // console.log('In the notes Service, getting settings for: user: ' + userId + ', class: ' +
    //  classId + ', section: ' + section );

    return this.http.get<NotesSettings>(this.globals.notessettings +
      '?userId=' + userId + '&classId=' + classId + '&section=' + section, { headers: myHeaders });

      // .do(data => {
      //   if (data) {
      //     // console.log('Got Notes Settings back from the API' + JSON.stringify(data));
      //     return data;
      //   } else {
      //     return new NotesSettings(userId, classId, section + '', false, []);
      //   }
      // })
      // .catch(this.handleError);
  }

  storeNotesSettings(notesSettingsObject): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    //  console.log('putting notes settings: ' + JSON.stringify(notesSettingsObject));

    if (!notesSettingsObject.folds) {
      notesSettingsObject.folds = [];
    }
    return this.http.put(this.globals.notessettings, notesSettingsObject,
      { headers: myHeaders });
      // .map(() => console.log('DONE'));


  }

  private handleError(error: HttpErrorResponse): string {
    console.log('ERROR:');
    console.log(JSON.stringify(error));
    return error.message;

  }
}




