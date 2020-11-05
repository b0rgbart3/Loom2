// import { Injectable, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';
// // import { Http, Response, Headers, RequestOptions } from '@angular/core';
// import { HttpHeaders } from '@angular/common/http';

// import * as io from 'socket.io-client';

// import { ClassModel } from '../models/classModel.model';
// import { Thread } from '../models/thread.model';
// import { Globals } from '../../globals';
// import { User } from '../models/user.model';
// import { LoomNotificationsService } from '../services/loom.notifications.service';
// import { LoomNotification } from '../models/loom.notification.model';
// import { DiscussionSettings } from '../models/discussionsettings.model';
// // import { HttpParamsOptions } from '@angular/common/http/src/params';

// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
//   responseType: 'text'
// };

// @Injectable()


// export class DiscussionService {

//   private dsCount = 0;
//   private highestID = 0;
//   threads: Thread[];
//   errorMessage: string;


//   discussionSettings: DiscussionSettings[];
//   public entered: EventEmitter<User>;
//   private socket: io.Socket;
//   threadAdded: EventEmitter<Thread>;
//   threadDeleted: EventEmitter<Thread>;
//   userEntered: EventEmitter<Thread>;
//   threadUpdated: EventEmitter<Thread>;
//   headerOptions: {};

//   constructor(
//     private http: HttpClient,
//     private loomNotificationService: LoomNotificationsService,
//     private globals: Globals) {
//     this.threadAdded = new EventEmitter();
//     this.threadDeleted = new EventEmitter();
//     this.userEntered = new EventEmitter();
//     this.threadUpdated = new EventEmitter();

//     this.socket = io(this.globals.basepath);

//     this.socket.on('updatethread', (data) => {
//       console.log('GOT A THREAD UPDATE');
//       console.log(JSON.stringify(data));

//       this.threadUpdated.emit(data);
//     });

//     this.socket.on('newthread', (data) => {
//       this.threadAdded.emit(data);
//     });

//     this.socket.on('deletethread', (data) => {
//       this.threadDeleted.emit(data);
//     });


//   }

//   takeInResolvedData(ds: DiscussionSettings[]): void {
//     this.discussionSettings = ds;
//   }

//   getHighestID(): number {
//     this.updateIDCount();
//     return this.highestID;
//   }

//   getDiscussionSettingsNow(): void {
//     this.getAllDiscussionSettings().subscribe(
//       discussionSettings => this.discussionSettings = discussionSettings,
//       error => this.errorMessage = error);
//   }

//   getAllDiscussionSettings(): Observable<any> {
//     //  console.log('In discussion service, getAllDiscussionSettings.');
//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');

//     return this.http.get<DiscussionSettings[]>(this.globals.discussionsettings, { headers: myHeaders });
//       // debug the flow of data
//       // .subscribe(data => {
//       //   //    console.log('Got All ths dsObjects: ' + JSON.stringify(data));
//       //   this.discussionSettings = data;
//       //   this.dsCount = data.length;

//       //   // Loop through all the Classes to find the highest ID#

//       //   data.forEach ( (datum) => {
//       //     const foundID = Number(datum.dsId);

//       //     if (foundID >= this.highestID) {
//       //       const newHigh = foundID + 1;
//       //       this.highestID = newHigh;
//       //     }
//       //   });


//       // })

//   }

//   updateIDCount(): void{
//     // Loop through all the Materials to find the highest ID#
//     if (this.discussionSettings && this.discussionSettings.length > 0) {
//       this.discussionSettings.forEach( (ds) => {
//         const foundID = Number(ds.dsId);
//         // console.log('Found ID: ' + foundID);
//         if (foundID >= this.highestID) {
//           const newHigh = foundID + 1;
//           this.highestID = newHigh;
//           // console.log('newHigh == ' + newHigh);
//         }
//       });
//     } else {
//       this.getDiscussionSettingsNow();
//       if (this.highestID < 1) {
//         this.highestID = 1;
//       }
//     }
//   }

//   createNewDSObject(userId, classId, section): any {
//     const newDSObject = new DiscussionSettings('', userId, classId, section, false, []);
//     newDSObject.id = this.getHighestID() + '';
//     this.discussionSettings.push(newDSObject); // keep track of the newly created objects
//     return newDSObject;
//   }

//   storeDiscussionSettings(discussionSettingsObject): Observable<any> {
//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');

//     //   console.log('About to store DS Object: ' + JSON.stringify(discussionSettingsObject) );
//     // console.log('Storing settings: ' + JSON.stringify(discussionSettingsObject));
//     // return this._http.put <DiscussionSettings> (this.globals.discusssettings, {headers: myHeaders} )
//     //  .do (data => { console.log('Got Discussion Settings back from the API' + JSON.stringify(data)); })
//     //  .catch ( this.handleError );

//     if (!discussionSettingsObject.folds) {
//       discussionSettingsObject.folds = [];
//     }
//     return this.http.put(this.globals.discussionsettings + '?id=' + discussionSettingsObject.id, discussionSettingsObject,
//       { headers: myHeaders });


//   }
//   getDiscussionSettings(userId, classId, section): Observable<any> {
//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');

//     return this.http.get<DiscussionSettings>(this.globals.discussionsettings +
//       '?userId=' + userId + '&classId=' + classId + '&section=' + section, { headers: myHeaders });
//   }

//   updatehighestID(): void {
//     // Loop through all the Classes to find the highest ID#

//     this.threads.forEach( (thread) => {
//       const foundID = Number(thread.threadId);

//       if (foundID >= this.highestID) {
//         const newHigh = foundID + 1;
//         this.highestID = newHigh;
//       }
//     });

//     if (this.highestID <= 0) {
//       this.highestID = 1;
//     }
//   }

//   getThreads(classId, section): Observable<any> {
//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');

//     //   console.log('Looking to load threads for class: ' + class_id + ', and section: ' + section);
//     return this.http.get<Thread[]>(this.globals.threads + '?classId=' + classId + '&section=' +
//       section, { headers: myHeaders });
//       // debug the flow of data
//      // .do(data => {
//         // console.log('All: ' + JSON.stringify(data));

//         // Is there any point in keeping a local copy of the threads?
//       //  this.threads = data;

//        // this.updatehighestID();
//         // console.log('Thread\'s highest ID: ' + this.highestID);

//     //  })
//     //  .catch(this.handleError);
//   }



//   getThread(id): Observable<any> {
//     return this.http.get<Thread[]>(this.globals.threads + '?threadId=' + id);

//   }

//   deleteThread(thread): Observable<any> {
//     // console.log('Deleting thread: ' + JSON.stringify(thread));

//     this.socket.emit('deletethread', thread);
//     return this.http.delete(this.globals.threads + '?id=' + thread.id);
//   }


//   newThread(thread): Observable<any> {

//     thread.threadId = this.highestID.toString();
//     this.highestID++;

//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');

//     // Let's Emit to subscribers that we're creating a new thread.
//     // this.threadAdded.emit(thread);

//     // this.sendNotice( {type: 'info', message: ['Welcome to the discussion, ' + thread ], delay: 2000} );

//     this.socket.emit('newthread', thread);

//     // Note: I'm using post instead of put - so I can trigger the API to double-check the id#
//     // and if it exists already, then determine what it should be

//     return this.http.put(this.globals.threads + '?threadId=' + thread.id, thread,
//       { headers: myHeaders });

//   }

//   updateThread(thread): Observable<any> {

//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');


//     // Note: I'm not passing the id as part of the url -- because it's inside the classObject
//     const url = this.globals.threads;
//     return this.http.put(url + '?id=' + thread.id,
//       thread, { headers: myHeaders });
//       // .do(data => {
//       //   console.log('Successfully Put the UPDATE to the thread: ' + JSON.stringify(thread));

//       //   this.socket.emit('updatethread', thread);
//       // }).catch(this.handleError);

//   }

//   private handleError(error: HttpErrorResponse): string {
//     console.log('ERROR:');
//     console.log(JSON.stringify(error));
//     return error.message;

//   }

//   private handleErrors(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       // A client-side or network error occurred. Handle it accordingly.
//       console.error('An error occurred:', error.error.message);
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong,
//       console.error(
//         `Backend returned code ${error.status}, ` +
//         `body was: ${JSON.stringify(error.error)}`);
//     }
//     // return an ErrorObservable with a user-facing error message
//     // return new ErrorObservable(
//     //   'Something bad happened; please try again later.');

//     return throwError('Something bad happened; please try again later');

//   }

//   enterDiscussion(user: User, thisClass: ClassModel, section: string): Observable<any> {
//     // return Observable.of(null);
//     //  console.log('entering the discussion: ');
//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');
//     const enterDiscussionObject = new DiscussionSettings('', user.id, thisClass.id, section, true, []);
//     enterDiscussionObject.id = this.getHighestID() + '';
//     return this.http.put(this.globals.discussionsettings, enterDiscussionObject, this.headerOptions);
//   }

//   // return an array of ID's of who's currently in the chatroom

//   // whosIn( thisClass: ClassModel, section: number ): Observable <any> {
//   //     // console.log('Discussion service is requesting whos in the discussion.' + thisClass.id);
//   //     let whosIn = [];
//   //     const whosInObject = { classID: thisClass.id };
//   //     return this._http.get <any[]> ( this.globals.whosin + '?id=' +
//   //       thisClass.id + '&section=' + section  ).do( data => {whosIn = data;
//   //    // console.log('got the whosin data: ' + JSON.stringify( data ) );
//   //    }).catch(this.handleError );
//   // }
//   sendNotice(data): void {
//     //  console.log('In Discussion service, about to send notice.');
//     this.loomNotificationService.add(new LoomNotification(data.type, data.message, data.delay));

//   }

//   introduceMyself(user, classID, section): void {
//     this.sendNotice({ type: 'info', message: ['Welcome to the discussion, ' + user.username], delay: 2000 });

//     this.socket.emit('enter', user, classID, section);

//   }

// }




