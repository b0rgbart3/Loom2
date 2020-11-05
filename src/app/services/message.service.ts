// import { Injectable, OnInit, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
// import * as io from 'socket.io-client';
// import { Globals } from '../../globals';
// import { LoomNotificationsService } from '../services/loom.notifications.service';
// import { Message } from '../models/message.model';
// import { Subject } from 'rxjs';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
//   responseType: 'text'
// };

// @Injectable()


// export class MessageService {

//   messageCount: number;
//   messages: Message[];
//   errorMessage: string;
//   highestID: number;
//   msgChanged: EventEmitter<Message>;
//   private socket: io.Socket;


//   private message = new Subject<{}>();

//   public msgAdded = this.message.asObservable();

//   public sendMessage(message: Message): void {
//     // console.log('got request to send a message: ' + JSON.stringify(message));
//     this.message.next(message);
//   }

//   constructor(
//     private http: HttpClient,
//     private notes: LoomNotificationsService,
//     private globals: Globals) {
//     this.msgChanged = new EventEmitter();
//     this.highestID = 0;


//     this.socket = io(this.globals.basepath);

//     this.socket.on('messageChanged', (message) => {
//       this.msgChanged.emit(message);
//     });
//   }

//   takeInResolvedData(messages: Message[]): void {
//     this.messages = messages;
//   }



//   gethighestID(): string {
//     this.updateIDCount();
//     return this.highestID + '';
//   }

//   getFreshList(userId): Observable<any> {
//     const userString = '?users=' + userId + '&fresh=true';
//     // console.log('getting fresh list for: ' + userId + ', at: ' + this.globals.freshmessages + '' + userString);

//     return this.http.get<Message[]>(this.globals.messages + userString);
//     // .
//     //   do(data => { // console.log('got data back for fresh list: ' + JSON.stringify(data) );
//     //     return data;
//     //   }
//     //   ).catch(this.handleError);
//   }
//   getMessage(users: string[]): Observable<any> {
//     console.log('In msg service, getitng message for users: ' + users[0] + ', ' + users[1]);
//     return this.http.get<Message>(this.globals.messages + '?users=' +
//       users[0] + ',' + users[1]);
//       // .
//       // do(data => data).catch(
//       //   this.handleError);
//   }

//   getConversation(users): Observable<any> {
//     const urlString = this.globals.messages + '?users=' + users[0] + ',' + users[1];
//     console.log('Getting conversation: ' + urlString);
//     return this.http.get<Message[]>(urlString);
//   }
//   getMessagesForUser(userId): Observable<any> {
//     // console.log('In message service, getting messages for user: ' + userId );
//     return this.http.get<Message[]>(this.globals.messages + '?users=' +
//       userId);

//       // .do(data => { // console.log('Got messages for user: ' + JSON.stringify(data));
//       //   return data;
//       // }
//       // ).catch(this.handleError);
//   }

//   // get all the messages - so we can keep track of our ID#s
//   getMessages(): Observable<any> {

//     //  console.log('getting messages from api...: ' + this.globals.messages);
//     return this.http.get<Message[]>(this.globals.messages);

//     // .do(data => {
//     //   // console.log('Got messages from the API.');
//     //   //  console.log(JSON.stringify(data));
//     //   this.messageCount = data.length;
//     //   this.messages = data;
//     //   this.updateIDCount();


//     // })
//     //   .catch(this.handleError);
//   }


//   updateIDCount(): void {
//     // Loop through all the Materials to find the highest ID#
//     if (this.messages && this.messages.length > 0) {
//       this.messages.forEach(message => {
//         const foundID = Number(message.messageId);
//         // console.log('Found ID: ' + foundID);
//         if (foundID >= this.highestID) {
//           const newHigh = foundID + 1;
//           this.highestID = newHigh;
//           // console.log('newHigh == ' + newHigh);
//         }
//       });
//     } else { this.highestID = 1; }
//   }

//   makeStale(message): Observable<any> {
//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');


//     message.freshness[0].fresh = false;
//     message.freshness[1].fresh = false;
//     //  console.log('saving the Message: ' + JSON.stringify(message));

//     return this.http.put(this.globals.messages +
//       '?id=' + message.id, message, { headers: myHeaders });
//       // .map(
//       //   () => {
//       //     return message;
//       //   });
//   }

//   createMessage(message): Observable<any> {
//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');
//     //  console.log('saving the Message');

//     return this.http.put(this.globals.messages + '?id=' + message.messageId, message, { headers: myHeaders });
//     // .map(
//     //   () => {
//     //     console.log('in msg service, done creating new message');
//     //     this.messages.push(message);
//     //     this.getMessages();
//     //     return message;
//     //   });

//   }
//   saveMessage(message): Observable<any> {

//     const myHeaders = new HttpHeaders();
//     myHeaders.append('Content-Type', 'application/json');
//     console.log('saving the Message');

//     return this.http.put(this.globals.messages + '?id=' + message.messageId, message, { headers: myHeaders });
//     // .map(
//     //   () => {
//     //     this.socket.emit('messageChanged', message);
//     //     return message;
//     //   });

//   }


//   private handleError(error: HttpErrorResponse): string {
//     // console.log( error.message );
//     return error.message;

//   }


// }




