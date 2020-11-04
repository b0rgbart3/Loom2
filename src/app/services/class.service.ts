import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassModel } from '../models/classModel.model';
import { Globals } from '../../globals';

@Injectable()
export class ClassService {
  private classCount = 0;
  private highestID = 0;
  classes: ClassModel[];
  errorMessage: string;
  removedClasses: ClassModel[];
  constructor(private http: HttpClient, private globals: Globals) {
  }

  takeInResolvedData( classes: ClassModel[]): void {
    this.classes = classes;
  }


  gethighestID(): number {
    this.updateIDCount();
    return this.highestID;
  }

  updateIDCount(): void {
    // Loop through all the Materials to find the highest ID#
    if (this.classes && this.classes.length > 0) {

      this.classes.forEach( classObject => {
        const foundID = Number(classObject.id);
        // console.log('Found ID: ' + foundID);
        if (foundID >= this.highestID) {
          const newHigh = foundID + 1;
          this.highestID = newHigh;
          // console.log('newHigh == ' + newHigh);
        }
      });
    } else {
      this.getClassesNow();
    }
  }

  getClassesNow(): any {
    this.getClasses().subscribe(
      classes => this.classes = classes,
      error => this.errorMessage = error);
  }

  getClasses(): Observable<ClassModel[]> {
    console.log('getting classes');
    return this.http.get<ClassModel[]>(this.globals.classes);
  }


  // This doesn't currently pass the ID to the API -- this needs to be worked on.
  getClass(id): Observable<ClassModel> {
    return this.http.get<ClassModel>(this.globals.class);
  }

  getClassFromMemory(queryID): ClassModel {
    console.log('In getClassFromMemory method, looking for: ', queryID, 'in: ',  this.classes);

    if (this.classes) {
      // console.log('looking: ' + this.classes.length);

      const found = this.classes.filter(classObject => classObject.classId + '' === queryID);
      return found[0];
    }
    return null;
  }

  updateClass(classObject: ClassModel): Observable<any> {

    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    return this.http.put(this.globals.classes + '?id=' + classObject.id, classObject, { headers: myHeaders });

  }

  deleteClass(classId: number): Observable<any> {
    return this.http.delete(this.globals.classes + '?id=' + classId);
  }

  createClass(classObject): Observable<any> {

    // console.log('In createClass method of the Class Service: ' + JSON.stringify(classObject));
    classObject.id = this.gethighestID().toString();
    // console.log('New id =' + classObject.id);
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    const url = this.globals.classes;
    const putString = url + '?id=' + classObject.id;
    //  console.log('Put string: ' + putString);
    return this.http.put(putString, classObject, { headers: myHeaders });

  }

  removeClass(classObject: ClassModel): Observable<any> {
    classObject.removeThis = true;
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    return this.http.put(this.globals.classes + '?id=' + classObject.id, classObject, { headers: myHeaders });

  }


  recoverClass(classObject): void {
    classObject.remove_this = false;
    // return this.updateClass(classObject).subscribe(
    //   (data: ClassModel ) => {this.classes.push(data);
    //     this.removedClasses.filter(classModel=>classModel.id !== data.id);
    //   },
    //   (err: error) => console.log(err),
    //   ()=>console.log('updated classs in recover class');
    // )

    // do(
    //   data => {
    //     // add this class object back into our main array
    //     this.classes.push(data);
    //     // remove this class object from our list of removed classes
    //     for (let i = 0; i < this.removedClasses.length; i++) {
    //       if ( this.removedClasses[i].id === data.id) {
    //         this.removedClasses.splice(i, 1);
    //       }
    //     }

    //     console.log('recovering course data');
    //     return data; }   )
    //   .catch( this.handleError );

  }
}




