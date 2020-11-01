import { Component, OnInit, Input } from '@angular/core';
import { ClassModel } from '../../../models/classModel.model';
import { Course } from '../../../models/course.model';
import { Assignment } from '../../../models/assignment.model';
import { ClassService } from '../../../services/class.service';
import { User } from '../../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
  providers: [ClassService]
})

export class ClassListComponent implements OnInit {

  selectedClass: {};
  errorMessage: string;
  admin: boolean;
  currentUser: User;

  @Input() classes: ClassModel[];
  @Input() users: User[];
  @Input() courses: Course[];
  @Input() assignments: Assignment[];
  @Input() showRegButtons: boolean;

  constructor(private classService: ClassService, private userService: UserService) { }

  ngOnInit(): void {

    this.currentUser = this.userService.getCurrentUser();
    console.log('In class list component:', this.classes, this.users, this.courses, this.assignments, this.showRegButtons);
    // this.classService.getClasses().subscribe(
    //   data => {
    //     console.log('Got data back from classService', data);
    //     this.classes = data;
    //     this.weedOut();
    //   },
    //   error => console.log(error),
    //   () => console.log('back from getting classes in init of cL-Comp')
    // );

  }
    // Let's not display classes that don't yet have enough real data
  weedOut(): void {
    console.log('weeding out');
    this.classes.forEach((thisClass, index) => {
      if ((!thisClass.start)) {
        this.classes.splice(index, 1);
      }
    });
  }
  private getIndexOfClass = (classId: string) => {
    return this.classes.findIndex((classObject) => {
      return classObject.classId === classId;
    });
  }

  selectClass(classObject: ClassModel): void {
    this.selectedClass = classObject;
  }

  createNewClass(): void {
    const classObject: ClassModel = {
      classId: '0', title: '', course: '', start: new Date(), end: new Date(),
      courseObject: null, courseImageURL: '', cost: '', costBlurb: '', removeThis: false
    };

    // By default, a newly-created course will have the selected state.
    this.selectClass(classObject);
  }

  deleteClass = (classId: string) => {
    const idx = this.getIndexOfClass(classId);
    if (idx !== -1) {
      this.classes.splice(idx, 1);
      this.selectClass(null);
    }
    return this.classes;
  }

  addClass = (classObject: ClassModel) => {
    this.classes.push(classObject);
    this.selectClass(classObject);
    return this.classes;
  }

  updateClass = (classObject: ClassModel) => {
    const idx = this.getIndexOfClass(classObject.classId);
    if (idx !== -1) {
      this.classes[idx] = classObject;
      this.selectClass(classObject);
    }
    return this.classes;
  }
}
