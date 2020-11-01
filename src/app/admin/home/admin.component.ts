import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { User } from '../../models/user.model';
import { ClassModel } from '../../models/classModel.model';
import { CourseService } from '../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../services/class.service';
import { UserService } from '../../services/user.service';
import { MaterialService } from '../../services/material.service';
import { Material } from '../../models/material.model';
import { Userthumbnail } from '../../models/userthumbnail.model';
import { Globals } from '../../../globals';
import { Book } from '../../models/book.model';
import { Series } from '../../models/series.model';
import { SeriesService } from '../../services/series.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],

})

export class AdminComponent implements OnInit {

  courses: Course[];
  classes: ClassModel [];
  users: User [];
  instructors: User[];
  errorMessage: string;
  courseCount: number;
  // assets: Asset [];
  username: string;
  materials: Material [];
  books: Book [];
  public instructorThumbnails: Userthumbnail[];
  public userThumbnails: Userthumbnail[];
  AVATAR_IMAGE_PATH: string;
  public isCollapsedStudents: boolean;
  public studentsShowing = 'showing';
  public instructorsShowing = 'showing';
  public classesShowing = 'showing';
  public coursesShowing = 'showing';
  public materialsShowing = 'showing';
  public booksShowing = 'showing';
  public seriesShowing = 'showing';
  series: Series[];

  constructor(
    private courseService: CourseService,
    private classService: ClassService,
    private materialService: MaterialService,
    private router: Router,
    private userService: UserService,
    private seriesService: SeriesService,
    private globals: Globals,
    private activatedRoute: ActivatedRoute,

  ) {
    this.AVATAR_IMAGE_PATH = globals.basepath + 'avatars/';
    this.isCollapsedStudents = false;
  }

  ngOnInit(): void {

    this.username = localStorage.getItem('username');
    this.users = this.activatedRoute.snapshot.data.users;

    // this.getClasses();
    // this.getCourses();

    this.instructors = this.activatedRoute.snapshot.data.instructors;

   // this.getSeries();
  }


  closer(): void {
    this.router.navigate(['/home']);
  }

  toggleStudents(): void {
     if (this.studentsShowing === 'showing') {
       this.studentsShowing = 'hiding';
     } else {
       this.studentsShowing = 'showing';
     }
  }

  toggleInstructors(): void {
    if (this.instructorsShowing === 'showing') {
      this.instructorsShowing = 'hiding';
    } else {
      this.instructorsShowing = 'showing';
    }
 }

 toggleClasses(): void {
  if (this.classesShowing === 'showing') {
    this.classesShowing = 'hiding';
  } else {
    this.classesShowing = 'showing';
  }
}

toggleCourses(): void {
  if (this.coursesShowing === 'showing') {
    this.coursesShowing = 'hiding';
  } else {
    this.coursesShowing = 'showing';
  }
}

toggleMaterials(): void {
  if (this.materialsShowing === 'showing') {
    this.materialsShowing = 'hiding';
  } else {
    this.materialsShowing = 'showing';
  }
}

// toggleBooks() {
//   if (this.booksShowing === 'showing') {
//     this.booksShowing = 'hiding';
//   } else {
//     this.booksShowing = 'showing';
//   }
// }

toggleSeries(): void {
  if (this.seriesShowing === 'showing') {
    this.seriesShowing = 'hiding';
  } else {
    this.seriesShowing = 'showing';
  }
}

  createThumbnail(user): any {
    const thumbnailObj = { user, userId: user.userId,
       online: false, size: 45, showUsername: false,
      showInfo: false, textColor: '#000000', border: false, shape: 'circle' };
    return thumbnailObj;
  }

  createEditableThumbnail(user): any {
    const thumbnailObj = { user, userId: user.userId,
      online: false, size: 45, showUsername: false,
      showInfo: false, textColor: '#0000000', border: false, shape: 'circle' };
    return thumbnailObj;
  }


  // getClasses() {
  // this.classService
  // .getClasses().subscribe(
  //   classes =>  this.classes = classes,
  //   error => this.errorMessage = <any>error);
  // }

  // getCourses() {
  // this.courseService
  // .getCourses().subscribe(
  //   courses =>  {this.courses = courses;
  //   this.courseCount = this.courses.length; },
  //   error => this.errorMessage = <any>error);
  // }


  // getSeries() {
  //   this.seriesService.getSeries(0).subscribe(
  //     series => {this.series = series;
  //       console.log('Got Series: ' + JSON.stringify(series));
  //     },
  //     error => this.errorMessage = <any>error);
  // }

  deleteCourse(courseId): void{

    const result = confirm( 'Are you sure you want to delete this course? ');
    if (result) {
    this.courseService.deleteCourse(courseId).subscribe(
      data => {
     // this.getCourses();
     },
      error => this.errorMessage = error );
   }
  }

  newClass(): void {
    this.router.navigate(['/classedit/0']);
  }

  newSeries(): void {
    this.router.navigate(['/series/0/edit']);
  }

  editSeries(seriesId): void {
    this.router.navigate(['/series/' + seriesId + '/edit']);
  }

  deleteClass(classId): void {
    const result = confirm( 'Are you sure you want to delete this class? ');
    if (result) {
    this.classService.deleteClass(classId).subscribe(
      data => {
     // this.getClasses();
    },
      error => this.errorMessage = error );
    }
  }

  deleteUser(username, userId): void {
    const result = confirm( 'Are you sure you want to completely delete ' + username + '\'s account?');
    if (result) {
    this.userService.deleteUser(userId).subscribe(
      data => {
      //  this.getUsers();
       },
        error => this.errorMessage = error );

    }
  }

  deleteMaterial(materialId): void {
    const result = confirm( 'Are you sure you want to delete this material? ');
    if (result) {
    this.materialService.deleteMaterial(materialId).subscribe(
      data => {
      // this.getMaterials();
     },
      error => this.errorMessage = error );
    }
  }


}
