import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataError } from '../models/dataerror.model';
import { User } from '../models/user.model';
import { ClassModel } from '../models/classModel.model';
import { Course } from '../models/course.model';
import { Assignment } from '../models/assignment.model';
import { Globals } from '../../globals';
import { Reset } from '../models/reset.model';
import { of } from 'rxjs';
import * as io from 'socket.io-client';
// import { Console } from 'console';
import { Userthumbnail } from '../models/userthumbnail.model';

/*   Methods in this Service
-------------------------------------
getUsers

-------------------------------------
*/

@Injectable()
export class UserService {
  currentUser: User;
  subscribeduser: User;
  private highestID;
  private userCount = 0;
  users: User[];
  errorMessage: string;
  usersLoaded: boolean;
  public token: string;
  public username;
  public color: string;
  private basePath;
  resetUrl;
  private avatarsUrl;
  private classregistrationsUrl;
  private instructorsUrl;
  private studentsUrl;
  private avatarImageUrl;
  instructorThumbnailsByClass: {};
  userSettingsUrl;
  // private socket: SocketIOClient.Socket;
  redirectMsg: string;
  redirectUrl: string;

  constructor(private http: HttpClient, private globals: Globals) {
    const storedUser = localStorage.getItem('currentUser');
    let thisUser = null;
    if (storedUser) {
      thisUser = JSON.parse(storedUser);
    }
    this.currentUser = thisUser;

    this.token = thisUser && thisUser.token;
    this.username = thisUser && thisUser.username;
    this.basePath = globals.basepath;
    this.userSettingsUrl = this.basePath + 'api/usersettings';
    this.avatarsUrl = this.basePath + 'api/avatars';
    this.classregistrationsUrl = this.basePath + 'api/classregistrations';
    this.instructorsUrl = this.basePath + 'api/instructors';
    this.studentsUrl = this.basePath + 'api/students';
    this.resetUrl = this.basePath + 'api/reset';
    this.avatarImageUrl = this.globals.avatars;
    // this.socket = io(this.globals.basepath);
    this.usersLoaded = false;
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  hasUsers(): boolean {
    if (this.users && this.users.length > 0) {
      return true;
    } else {

      this.http.get<User[]>(this.globals.users).subscribe(
        data => this.users = data,
        error => console.log('In getUsers of UserService: ', error),
        () => console.log('Got users in UserService.')
      );

      return false;
    }
  }

  setCurrentUser(user: User): void {

    this.currentUser = user;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.setItem('currentUser', '');
  }

  takeInResolvedData(users: User[]): void {
    this.users = users;
  }

  grabUsers(): User[] {
    if (this.hasUsers) { return this.users; } else {
      return null;
    }

  }

  grabUserById(id: string): User {
    if (this.users && this.users.length > 0) {
      const grabbedUser: User[] = this.users.filter(user => user.userId === id);
      if (grabbedUser.length > 0) {
        return grabbedUser[0];
      }
    }
    return null;
  }

  getUsers(): Observable<User[] | DataError> {
    // console.log ('In user service, gettingUsers');

    return this.http.get<User[]>(this.globals.users)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );


  }

  getInstructors(): Observable<User[] | DataError> {
    // console.log ('In user service, gettingUsers');

    return this.http.get<User[]>(this.globals.users)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );


  }


  private handleHttpError(error: HttpErrorResponse): Observable<DataError> {
    const dataError = new DataError(100, error.message, 'An error occcurred retrieving data.');

    return throwError(dataError);

  }

  grabInstructorThumbnailsByClassId(classId: string): Userthumbnail[] {
    if (this.instructorThumbnailsByClass) {
    return this.instructorThumbnailsByClass[classId];
    }
  }

  // Organize Instructors by Class based on Assignment Data
  // Then build an array of Instructor Thumbnails

  createInstructorsDataObject(users: User[], assignments: Assignment[], classes: ClassModel[], courses: Course[]): void {

    const instructorIdsByClass = {};

    if (assignments) {
      assignments.forEach(assignment => {
        //  console.log('looping through assignments');
        //  this.instructors.push(this.userService.getUserFromMemoryById(assignment.userId) );
        if (instructorIdsByClass[assignment.classId]) {
          instructorIdsByClass[assignment.classId].push(assignment.userId);
        } else {
          instructorIdsByClass[assignment.classId] = [];
          instructorIdsByClass[assignment.classId].push(assignment.userId);
        }
      });

   //   console.log('In createInstructorsDataObject method.', instructorIdsByClass);

      this.instructorThumbnailsByClass = {};

      for (const key of Object.keys(instructorIdsByClass)) {
        // console.log(key, ':', value);
        this.instructorThumbnailsByClass[key] = [];
        instructorIdsByClass[key].forEach(userId => {
          this.instructorThumbnailsByClass[key].push(this.createInstructorThumbnail(userId));
        });

      }
    }

  }

  createInstructorThumbnail(id: string): Userthumbnail {
    // console.log('Making thumbnail for user: ' + JSON.stringify(userId));
    const thisUser = this.grabUserById(id);

    if (thisUser) {
      const thumbnailObj: Userthumbnail = {
        user: thisUser, userId: id, online: false,
        size: 80, showUsername: true, showInfo: false, textColor: '#ffffff', border: false, shape: 'circle'
      };

      return thumbnailObj;

    }
    return null;

  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.globals.user + `${id}`);
  }

  isloggedin(): boolean {
//    console.log('Looking for logged in user');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser != null) {
  //    console.log('found a user in current storage:', this.currentUser);
      return true;
    } else {
     // console.log('no logged in user.');
      return false; }
  }

  getCurrentUser(): User {
    if (!this.currentUser) {
      const possibleUser = localStorage.getItem('currentUser');
      if (possibleUser) {
        this.currentUser = JSON.parse(possibleUser);
      }
    }
    return this.currentUser;
  }

  login(loginObject): Observable<User> {

  //  console.log('About to login: ', loginObject);
    return this.http.post<User>(this.globals.authenticate, loginObject, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  isAdmin(): boolean {
    if (this.currentUser && this.currentUser.admin) {
      return true;
    }
  }


  resetPassword(resetObject: Reset): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    return this.http.put(this.resetUrl, resetObject, { headers: myHeaders });

  }


  getUserFromMemoryById(queryId: string): User {

  //  console.log('In User Service looking for a user by id of: ', queryId);
    let foundUser = null;
    if (this.hasUsers()) {
      foundUser = this.users.find(user => user.userId === queryId);
     // console.log('found user: ', foundUser);
    }
    return foundUser;
  }


  validateUser(code): Observable<any> {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.basePath + '/api/users?verificationID=' + code, { headers: myHeaders });
  }


  updateUser(userObject: User): Observable<any> {
    // console.log('Made it to the updateUser method.');
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    const body = JSON.stringify(userObject);
    return this.http.put(this.globals.users + '?id=' + userObject.id, userObject, { headers: myHeaders });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.globals.users + '?id=' + userId);
  }

  getAllInstructors(): Observable<User[]> {
    return this.http.get<User[]>(this.globals.users + '?instructor=true');
  }

  unsuspendUser(user: User): void {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    user.suspended = false;

    this.updateUser(user).subscribe(
      (data: any) => console.log('unsuspended user'), (err: any) => console.log('error suspending user.'));
  }

  suspendUser(user: User): void {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    user.suspended = true;

    this.updateUser(user).subscribe(
      (data: any) => console.log('suspended user'), (err: any) => console.log('error suspending user.'));
  }


  toggleInstructorStatus(user: User): void {
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    user.instructor = !user.instructor;
    this.updateUser(user).subscribe(data => { }, error => {
    //  console.log('error making instructor');
    });
  }


  createUser(userObject: User): Observable<any> {
    // this.subscribeToUsers();
    // console.log('Made it to the createUser method.');

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    userObject.id = '' + this.highestID; // toString();
    const body = JSON.stringify(userObject);
    //  console.log('Highest ID: ' + this.highestID );
    // console.log('In postUser.');
    // console.log( 'Posting User: ', body   );
    // console.log(this._usersUrl);

    // Let's double check to make sure this username or email doesn't already exist
    if (this.findUserByUsername(userObject.username) != null) {
      return of('We\'re sorry, but an account with that Username already exists.' +
        'Please choose a different Username.');
    } else {

      if (this.findUserByEmail(userObject.email) != null) {
        return of('We\'re sorry but an account with that Email address already exists.');
      } else {
        return this.http.put(this.globals.users + '?id=0', userObject, { headers: myHeaders });
      }
    }

  }

  // this.logout();
  // const myHeaders = new HttpHeaders();
  // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  // myHeaders.append('Access-Control-Allow-Origin',  this.globals.basepath   );
  // myHeaders.append('Access-Control-Allow-Methods', 'GET,PUT,POST,UPDATE,DELETE,OPTIONS');
  // myHeaders.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // console.log('With info: ' + JSON.stringify( loginObject ) );

  // return this._http.post(this.globals.authenticate, loginObject, {headers: myHeaders})
  //     .do(response => {

  //            console.log('Response: ' + JSON.stringify(response));

  //             this.currentUser = <User> response;
  //             this.username = this.currentUser.username;
  //             localStorage.setItem('currentUser', JSON.stringify( this.currentUser ) );
  //             this.socket.emit('userChanged', this.currentUser);
  //            return <User> response;
  //         }).catch( error => {   console.log('ERROR: ' + JSON.stringify( error) ); return Observable.of(error); } );



  findUserByUsername(queryName): User {
    let foundUser = null;

  //  console.log('searching for a user with a username of: ' + queryName);
    if (this.users) {

      this.users.forEach( user => {
      //  console.log(user.username);
        if (user.username === queryName) {
          foundUser = user;
        }
      });
    }

    return foundUser;
  }
  findUserByEmail(queryEmail): User {
    let foundUser = null;
    if (this.users) {
      this.users.forEach( user => {
        if (user.email === queryEmail) {
          foundUser = user;
        }
      });

    }
    return foundUser;
  }
}
