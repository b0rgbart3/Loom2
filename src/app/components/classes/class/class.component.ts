import { Component, OnInit, DoCheck, OnChanges, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassModel } from '../../models/classModel.model';
import { ClassService } from '../../services/class.service';
import { UserService } from '../../services/user.service';
import { ContentChart } from '../../models/contentchart.model';
import { Section } from '../../models/section.model';
import { MaterialService } from '../../services/material.service';
import { Material } from '../../models/material.model';
import { Userthumbnail } from '../../models/userthumbnail.model';
import { BoardSettings } from '../../models/boardsettings.model';
import { Globals } from '../../globals2';
import { MaterialCollection } from '../../models/materialcollection.model';
import { DiscussionSettings } from '../../models/discussionsettings.model';
import { DiscussionService } from '../../services/discussion.service';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentsService } from '../../services/enrollments.service';
import { NotesSettings } from '../../models/notessettings.model';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';
import { MessageService } from '../../services/message.service';
import { AssignmentsService } from '../../services/assignments.service';

import { Assignment } from '../../models/assignment.model';
import { MaterialSet } from '../../models/materialset.model';
import { Message } from '../../models/message.model';
import { Announcements } from '../../models/announcements.model';
import { AnnouncementsService } from '../../services/announcements.service';
import { DataError } from 'src/app/models/dataerror.model';

@Component({

    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css', './bios.css'],
    providers: [CourseService]
})

export class ClassComponent implements OnInit {

    // @Output() sendMsg: EventEmitter<{}> = new EventEmitter<{}>();
    classID: string;
    thisClass: ClassModel;
    errorMessage: string;
    classes: ClassModel[];
    courses: Course[];
    currentCourse: Course;
    courseMaterials: Material[];
    courseimageURL: string;
    users: User[];
    instructors: User[];
    studentIDList: string[];
    students: User[];
    instructorIDList: string[];
    instructorCount = 0;
    studentCount = 0;
    messages: Message[];
    materials = [];
    sectionNumber: number;
    section: Section;
    instructorThumbnails: Userthumbnail[];
    studentThumbnails: Userthumbnail[];
    studentBioThumbnails: Userthumbnail[];
    showingSectionMenu: boolean;
    showingAnnouncementsMenu: boolean;
    showingAnnouncements: boolean;
    showingAnnouncementsForm: boolean;
    currentUser: User;
    currentUserIsInstructor: boolean;
    COURSE_IMAGE_PATH: string;
    AVATAR_IMAGE_PATH: string;
    discussionSettings: DiscussionSettings[];
    classMaterials: Material[];
    notesSettings: NotesSettings;
    messaging: boolean;
    enrollments: Enrollment[];
    assignments: Assignment[];
    materialSets: MaterialSet[][];
    currentMaterials: MaterialSet[];
    announcements: Announcements[];
    currentAnnouncement: Announcements;

    // for the BIO Popup
    bioChosen: User;
    showingBio: boolean;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private classService: ClassService,
                private courseService: CourseService,
                private userService: UserService,
                private materialService: MaterialService,
                private discussionService: DiscussionService,
                private enrollmentsService: EnrollmentsService,
                private assignmentsService: AssignmentsService,
                private messageService: MessageService,
                private globals: Globals,
                private announcementsService: AnnouncementsService) {
    }

    clean(thisArray, deleteValue): any[] {
        for (let i = 0; i < thisArray.length; i++) {
            if (thisArray[i] === deleteValue) {
                thisArray.splice(i, 1);
                i--;
            }
        }
        return thisArray;
    }

    ngOnInit(): void {

        this.classID = this.activatedRoute.snapshot.params.id;
        console.log('This class\'s ID: ', this.classID);
        this.currentMaterials = null;
        this.messaging = false;
        this.currentUser = this.userService.getCurrentUser();
        this.currentUserIsInstructor = false;


        // GRAB ALL THE DATA FROM THE ROUTE RESOLVER..... DUH

        // allDSObjects: AllDiscussionSettingsResolver,
       // this.classes = this.activatedRoute.snapshot.data.classes;


        // if (this.classes instanceof DataError) {
        //     console.log('No Class Data...');
        // }

       // this.users = this.activatedRoute.snapshot.data.users;
        const resolvedUserData: User[] | DataError = this.activatedRoute.snapshot.data[`resolvedUsers`];

        let dataError = false;
        if (resolvedUserData instanceof DataError) {
            console.log(`Data loading error: ${resolvedUserData}`);
            dataError = true;
        } else {
            this.users = resolvedUserData;
            this.userService.takeInResolvedData(this.users);
        }

        const resolvedClassesData: ClassModel[] | DataError = this.activatedRoute.snapshot.data[`resolvedClasses`];


        if (resolvedClassesData instanceof DataError) {
            console.log(`Data loading error: ${resolvedClassesData}`);
            dataError = true;
        } else {
            this.classes = resolvedClassesData;
            this.classService.takeInResolvedData(this.classes);
            this.thisClass = this.classes.filter( aClass => aClass.classId === this.classID)[0];
        }

        const resolvedAssignmentData: Assignment[] | DataError = this.activatedRoute.snapshot.data[`resolvedAssignments`];

        if (resolvedAssignmentData instanceof DataError) {
            console.log(`Data loading error: ${resolvedAssignmentData}`);
            dataError = true;
        } else {
            this.assignments = resolvedAssignmentData;
            this.assignmentsService.takeInResolvedData(this.assignments);
        }

        const resolvedEnrollmentData: Enrollment[] | DataError = this.activatedRoute.snapshot.data[`resolvedEnrollments`];

        if (resolvedEnrollmentData instanceof DataError) {
            console.log(`Data loading error: ${resolvedEnrollmentData}`);
            dataError = true;
        } else {
            this.enrollments = resolvedEnrollmentData;
            console.log('All Enrollments:', this.enrollments);
            this.enrollmentsService.takeInResolvedData(this.enrollments);
        }



        const resolvedCourseData: Course[] | DataError = this.activatedRoute.snapshot.data[`resolvedCourses`];

        if (resolvedCourseData instanceof DataError) {
            console.log(`Data loading error: ${resolvedCourseData}`);
            dataError = true;
        } else {
            this.courses = resolvedCourseData;
            this.courseService.takeInResolvedData(this.courses);
        }

        const resolvedMessageData: Message[] | DataError = this.activatedRoute.snapshot.data[`resolvedMessages`];

        if (resolvedMessageData instanceof DataError) {
            console.log(`Data loading error: ${resolvedMessageData}`);
            dataError = true;
        } else {
            this.messages = resolvedMessageData;
            this.messageService.takeInResolvedData(this.messages);
        }

        const resolvedDiscussionSettingsData: DiscussionSettings[] | DataError = this.activatedRoute.snapshot.data[`resolvedDiscussionSettings`];

        if (resolvedDiscussionSettingsData instanceof DataError) {
            console.log(`Data loading error: ${resolvedDiscussionSettingsData}`);
            dataError = true;
        } else {
            this.discussionSettings = resolvedDiscussionSettingsData;
            this.discussionService.takeInResolvedData(this.discussionSettings);
        }

        const resolvedAnnouncementData: Announcements[] | DataError = this.activatedRoute.snapshot.data[`resolvedAnnouncements`];

        if (resolvedAnnouncementData instanceof DataError) {
            console.log(`Data loading error: ${resolvedAnnouncementData}`);
            dataError = true;
        } else {
            this.announcements = resolvedAnnouncementData;
            this.announcementsService.takeInResolvedData(this.announcements);
        }

        const resolvedCurrentCourse: Course | DataError = this.activatedRoute.snapshot.data.resolvedCurrentCourse;
        if (resolvedCurrentCourse instanceof DataError) {
            console.log(`Data loading error: ${resolvedCurrentCourse}`);
            dataError = true;
        } else {
            this.currentCourse = resolvedCurrentCourse[0];
          //  console.log('This currentCourse: ', this.currentCourse);
          //  this.announcementsService.takeInResolvedData(this.announcements);
        }

        const resolvedMaterialData: Material[] | DataError = this.activatedRoute.snapshot.data[`resolvedMaterials`];

        if (resolvedMaterialData instanceof DataError) {
            console.log(`Data loading error: ${resolvedMaterialData}`);
            dataError = true;
        } else {
            this.materials = resolvedMaterialData;
            console.log('This Materials', this.materials);
            this.materialService.takeInResolvedData(this.materials);
        }


        // console.log('this users: ', this.users);
    //     this.assignments = this.activatedRoute.snapshot.data.assignments;
    //    // console.log('this assignments: ', this.assignments);
    //     this.enrollments = this.activatedRoute.snapshot.data.enrollments;
    //     this.materials = this.activatedRoute.snapshot.data.allMaterials;
    //     this.courses = this.activatedRoute.snapshot.data.courses;
    //     this.messages = this.activatedRoute.snapshot.data.messages;
    //     this.discussionSettings = this.activatedRoute.snapshot.data.discussionSettings;
    //     this.announcements = this.activatedRoute.snapshot.data.announcements;
    //     this.currentCourse = this.activatedRoute.snapshot.data.thisCourse;
    //     console.log('This CurrentCourse: ', this.currentCourse);
    //     this.classMaterials = this.activatedRoute.snapshot.data.classMaterials;
    //     this.notesSettings = this.activatedRoute.snapshot.data.notesSettings;



        // this.instructors = this.assignments.map(assignment => this.userService.getUserFromMemoryById(assignment.userId));

        // console.log('In the instructors resolver, classID:', thisClassId);
        const assignments = this.assignmentsService.getAssignmentsForClass(this.thisClass.classId);

        console.log('found assignments:', assignments);
        const instructorIds = assignments.map( (inst) => inst.userId);
        console.log('instructor ids:', instructorIds);
      //  const thisClass = this.classService.getClass(thisClassId);

        // console.log('Activated class ID: ', thisClassId);
        // const thisClass = route.parent.data.classes.filter( aClass => aClass.classId === thisClassId)[0];
        const instructors = [];
        instructorIds.forEach( (inst) => {
         const instructor = this.userService.getUserFromMemoryById(inst);
         instructors.push(instructor);
        });
        this.instructors = instructors;

        this.instructorThumbnails = this.instructors.map(
              instructor => this.createInstructorThumbnail(instructor));

        this.studentIDList = [];
       // console.log('Enrollments: ', this.enrollments);

        this.students = this.enrollments.filter( (enr) => enr.classId === this.thisClass.classId)
        .map(enrollment => this.userService.getUserFromMemoryById(enrollment.userId));

       // console.log('Student list: ', this.students);
        this.studentThumbnails = this.students.map(student =>
                    this.createStudentThumbnail(student));
        // this.activatedRoute.params.subscribe(params => {
        //     this.onSectionChange(params.id2);

        //     // Grab the data from the Route

        //   //  console.log('THIS CLASS ID:', this.classID);
        //     this.classes = this.activatedRoute.snapshot.data.classes;

        //  //   console.log('THIS CLASS IS: ', this.thisClass);
        //     this.users = this.activatedRoute.snapshot.data.users;
        //     this.sectionNumber = this.activatedRoute.snapshot.params.id2;
        //     this.discussionSettings = this.activatedRoute.snapshot.data.discussionSettings;
        //     this.notesSettings = this.activatedRoute.snapshot.data.notesSettings;
        //     this.announcements = this.activatedRoute.snapshot.data.announcements;
        //     this.currentCourse = this.activatedRoute.snapshot.data.thisCourse[0];
        //   //  console.log('this CurrentCourse: ', this.currentCourse);
        //   //  console.log('Announcements: ' + this.announcements.length);
        //     this.currentUser = this.userService.getCurrentUser();
        // });

        // this.activatedRoute.parent.data.subscribe(
        //     data => { this.onDataRetrieved(data.thisClass); }
        // );

        if (!this.sectionNumber) { this.sectionNumber = 0; }


      //  console.log('THIS CLASS ID:', this.classID);
      //  console.log('THIS CLASS IS: ', this.thisClass);
      //  console.log('this CurrentCourse: ', this.currentCourse);
        // this.enrollmentsService.getEnrollmentsInClass(this.classID).subscribe(
        //     data => {
        //         this.enrollments = data;
        //         this.students = this.enrollments.map(enrollment => this.userService.getUserFromMemoryById(enrollment.userId));
        //         this.studentThumbnails = this.students.map(student =>
        //             this.createStudentThumbnail(student));
        //     }, err => { console.log('error getting enrollments'); });

        this.instructorIDList = [];
        // this.assignmentsService.getAssignmentsInClass(this.classID).subscribe(
        //     data => {
        //         this.assignments = data;
        //        // console.log('Assignments: ', this.assignments);
        //         this.instructors = this.assignments.map(assignment => this.userService.getUserFromMemoryById(assignment.userId));

        //       //  console.log('This class Instructors: ', this.instructors);
        //         this.instructorThumbnails = this.instructors.map(
        //             instructor => this.createInstructorThumbnail(instructor));
        //     }, err => { console.log('error getting assignments'); });

       // this.currentCourse = this.activatedRoute.snapshot.data.thisCourse;
       // console.log('CurrentCourse: ', this.currentCourse);
        this.courseimageURL = this.globals.courseimages + '/' + this.currentCourse.courseId
            + '/' + this.currentCourse.image;

       // this.classMaterials = this.activatedRoute.snapshot.data.classMaterials;
        this.classMaterials = this.buildMatObjectsArrayForThisClass();
        this.buildMaterialSets();
       // this.currentMaterials = this.materialSets[this.sectionNumber];

        this.section = this.currentCourse.sections[this.sectionNumber];
       // console.log('This section: ', this.section);

        this.activatedRoute.params.subscribe(params => {

            // We subscribe to the parameters, in case the section # changes,
            // because we'll need to update some of our data accordingly if it does

            if (params.id2) {
                this.sectionNumber = params.id2;

                if (this.currentCourse && this.currentCourse.sections) {

                    this.section = this.currentCourse.sections[this.sectionNumber];
                 //   this.currentMaterials = this.materialSets[this.sectionNumber];
                }

            }
        });

    }

    // We have material ID#s listed in each section - but we want the actual material Objects,
    // so here we grab the id's and then build a 2D array of material Objects
    // for each section.  The length of the classMaterials array == the # of sections.

    buildMatObjectsArrayForThisClass(): Material[] {
        const classMaterials = [];

        console.log('This curentCourse sections:', this.currentCourse.sections);

        this.currentCourse.sections.forEach( (aSection, index) => {

          //  console.log('This section: ', aSection);
            classMaterials[index] = [];
            if (aSection.materials) {
                aSection.materials.forEach( (materialId) => {
                    const thisMatObject = this.materialService.getMaterialFromMemory(materialId);
                    classMaterials[index].push(thisMatObject);
                });
            }

        });
        return classMaterials;
    }

    gotoEditor(): void {
        if (this.currentUser && this.currentUser.admin) {
            this.router.navigate(['/admin/courseObjects/' + this.thisClass.course + '/edit']);
        }
    }
    // This is where we look through ALL the materials - and group them into sets, if need be
    // for books and docs  (The only reason for doing this is that it is more aesthetically pleaseing
    // to have them grouped in clusters when they are displayed on the page ).
    buildMaterialSets(): void {
        this.materialSets = [];
        for (let j = 0; j < this.classMaterials.length; j++) {
            this.materialSets[j] = [];
            for (let i = 0; i < +this.classMaterials[j].length; i++) {
                let material = this.classMaterials[j][i];
                if (material) {
                    const aMaterialSet = new MaterialSet(false, material.type, []);

                    if ((material.type === 'book')) {
                        const first = i;
                        // collect books and documents together into sets of up to 4
                        while ((material && (material.type === 'book'))
                            && (i < first + 4) && (i < +this.classMaterials[j].length)) {
                            // its only a group if is more than one - so this only happens after the 2nd time
                            if (i > first) { aMaterialSet.group = true; }
                            aMaterialSet.materials.push(this.classMaterials[j][i]);
                            i++;
                            material = this.classMaterials[j][i];
                        }
                        if (i > first) { i--; }

                    } else {
                        if ((material.type === 'doc')) {
                            const first = i;
                            // collect books and documents together into sets of up to 4
                            while ((material && (material.type === 'doc'))
                                && (i < first + 4) && (i < +this.classMaterials[j].length)) {
                                if (i > first) { aMaterialSet.group = true; }// its only a group if is more than one
                                aMaterialSet.materials.push(this.classMaterials[j][i]);
                                i++;
                                material = this.classMaterials[j][i];
                            }
                            if (i > first) { i--; }

                        } else {
                            // If it's not a book or a doc - then we don't need to group it
                            if ((material.type !== 'doc') && (material.type !== 'book')) {
                                aMaterialSet.materials.push(material);
                            }
                        }
                    }
                    this.materialSets[j].push(aMaterialSet);
                }
            }
        }
        console.log('Material Sets:', this.materialSets);
    }
    showBio(user): void {
        if (!this.showingBio) {
            this.bioChosen = user;
            this.showingBio = true;
        }
    }
    closeBio(event): void {
        this.showingBio = false;
    }

    message(student): void {
        //  this.hideMenu(student);
        this.messageService.sendMessage(student);
    }

    onSectionChange(newSectionNumber): void {
        this.sectionNumber = newSectionNumber;
        this.discussionSettings = this.activatedRoute.snapshot.data.discussionSettings;
        this.notesSettings = this.activatedRoute.snapshot.data.notesSettings;
    }

    onDataRetrieved(newClassObject): void {
        this.thisClass = newClassObject;
    }

    showAnnouncementsMenu(): void{
        this.showingAnnouncementsMenu = !this.showingAnnouncementsMenu;
    }

    hideAnnouncementsMenu(): void {
        this.showingAnnouncementsMenu = false;
    }

    hideSectionMenu(): void {
        this.showingSectionMenu = false;
    }

    showSectionMenu(): void {
        this.showingSectionMenu = !this.showingSectionMenu;
    }

    createInstructorThumbnail(user): any {
        console.log('Creating instructor thumbnail:', user);
        if (user) {
            if (user.userId === this.currentUser.userId) {
                this.currentUserIsInstructor = true;
            }
            const thumbnailObj = {
                user, userId: user.userId, online: false,
                size: 100, showUsername: true, showInfo: false, textColor: '#ffffff', border: false, shape: 'circle'
            };
          //  console.log('Thumbnail: ', thumbnailObj);
            return thumbnailObj;
        }
    }

    createStudentThumbnail(user): any {
        if (user) {
            const thumbnailObj = {
                user, userId: user.userId, online: false,
                size: 60, showUsername: true, showInfo: false, textColor: '#ffffff', border: false, shape: 'circle'
            };
            return thumbnailObj;
        } else {
            return null;
        }
    }

    displayAnnouncement(t): void {
        this.showingAnnouncements = true;
        this.currentAnnouncement = this.announcements[t];
    }

    hideAnnouncements(): void {
        this.showingAnnouncements = false;
    }

    nextSection(): void {
        this.sectionNumber++;
        if (this.sectionNumber > (this.currentCourse.sections.length - 1)) {
            this.sectionNumber = (this.currentCourse.sections.length - 1);
        }
        this.section = this.currentCourse.sections[this.sectionNumber];
       // this.currentMaterials = this.materialSets[this.sectionNumber];
       // console.log('current Materials' + JSON.stringify(this.currentMaterials));
        const routeString = '/classes/' + this.classID + '/' + this.sectionNumber;
        this.router.navigate([routeString]);

    }

    prevSection(): void  {
        this.sectionNumber--;
        if (this.sectionNumber < 0) { this.sectionNumber = 0; }
        this.section = this.currentCourse.sections[this.sectionNumber];
       // this.currentMaterials = this.materialSets[this.sectionNumber];
        const routeString = '/classes/' + this.classID + '/' + this.sectionNumber;
        this.router.navigate([routeString]);

    }

    navigateTo(sectionNumber): void {
        this.showingSectionMenu = false;
        this.sectionNumber = sectionNumber;
       // this.currentMaterials = this.materialSets[this.sectionNumber];
        this.section = this.currentCourse.sections[this.sectionNumber];
        const routeString = '/classes/' + this.classID + '/' + this.sectionNumber;
        this.router.navigate([routeString]);
    }

    makeAnnouncement(): void {
        this.showingAnnouncementsForm = true;
    }
    closeAnnoucementsForm(event): void {
        this.showingAnnouncementsForm = false;
        // If we got an Announcments object back, then let's add it to our current list of announcements.
        if (event) {
            console.log('This is the event / Announcment we got back: ' + JSON.stringify(event));
            this.announcements.push(event);
        }
    }
    deleteAnnouncement(): void {
        console.log('About to deete Announcement with id of: ' + this.currentAnnouncement.id);

        this.announcementsService.delete(this.currentAnnouncement.id).subscribe(
            (data) => {
                console.log('Got back from the Announcement Service, after deleting.');
                this.showingAnnouncements = false;
                const index = this.announcements.indexOf(this.currentAnnouncement);
                console.log('Announcements: ' + JSON.stringify(this.announcements));
                console.log('index: ' + index);
                this.announcements.splice(index, 1);
            },
            error => {
                this.errorMessage = error;
                console.log('Got back from the Announcement Service, with error deleting.');
                // This is a work-around for a HTTP error message I was getting even when the
                // course was successfully deleted.
                if (error.status === 200) {
                    console.log('But this is one of those bogus errors');
                    this.showingAnnouncements = false;
                    const index = this.announcements.indexOf(this.currentAnnouncement);
                    console.log('Announcements: ' + JSON.stringify(this.announcements));
                    console.log('index: ' + index);
                    this.announcements.splice(index, 1);

                    // this.router.navigate(['/coursebuilder']);
                } else {
                    console.log('Error: ' + JSON.stringify(error));
                }
            });

    }

}


