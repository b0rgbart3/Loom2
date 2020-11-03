import { Component, OnInit, Output, Input, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../../models/course.model';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.model';
import { Section } from '../../../models/section.model';
import { MaterialCollection } from '../../../models/materialcollection.model';
import { Book } from '../../../models/book.model';
import { Doc } from '../../../models/doc.model';
import { ClassModel } from '../../../models/classModel.model';
import { UserService } from '../../../services/user.service';
import { DiscussionService } from '../../../services/discussion.service';
import { DiscussionSettings } from '../../../models/discussionsettings.model';
import { User } from '../../../models/user.model';
import { NotesSettings } from '../../../models/notessettings.model';
import { MaterialSet } from '../../../models/materialset.model';

@Component({
   // moduleId: module.id,
    selector: 'app-course-section-comp',
    templateUrl: 'course-section.component.html',
    styleUrls: ['course-section.component.css'],
})


export class CourseSectionComponent implements OnInit, OnChanges {

    title: string;
    content: string;

    @Input() thisClass: ClassModel;
    @Input() course: Course;
    @Input() section: Section;
    @Input() students: User[];
    @Input() instructors: User[];
    @Input() discussionSettings: DiscussionSettings;
    @Input() notesSettings: NotesSettings;
    @Input() materialSets: MaterialSet[];

    public books: Material [];
    public docs: Material [];
    errorMessage: string;
    constructor(private materialService: MaterialService,
                private discussionService: DiscussionService,
                private userService: UserService,
        ) {}

    ngOnInit(): void {

       console.log('In Course Section Component INit: materials sets:', this.materialSets);
      //  this.initMe();
    }

    initMe(): void {

     //   console.log('In section init: discussionSettings: ' +
       //  JSON.stringify(this.discussionSettings));
        // this.materialCollection = null;
       // this.section = this.course.sections[this.section.sectionNumber];

        // const sortedMaterials = this.materialService.sortMaterials(this.materials);
        // this.materialCollection = sortedMaterials;

    }

    ngOnChanges(): void {
      //  console.log('In Section Init: Materials: ' + JSON.stringify(this.materials));
        // console.log('somethign changeD: ' + this.sectionNumber);
        // this.discussionService.getDiscussionSettings(this.userService.currentUser.id,
        //     this.thisClass.id, this.sectionNumber).
        // map(dsObject => { if (dsObject) {
        //     console.log('found existing ds object.');
        // this.discussionSettings = dsObject; } else {
        //         console.log('did not find ds object, so creating one.');
        //         const newDSObject = new DiscussionSettings( this.userService.currentUser.id,
        //             this.thisClass.id, this.sectionNumber + '', false, []);
        // const returnableArray = [];
        // returnableArray.push(newDSObject);
        // console.log('returning: ' + JSON.stringify(returnableArray));
        // return returnableArray;
        //     } });
        // this.initMe();
     }


}



// import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
// import { Router } from '@angular/router';
// import { Course } from '../../models/course.model';
// import { MaterialService } from '../../services/material.service';
// import { Material } from '../../models/material.model';
// import { Section } from '../../models/section.model';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';




// @Component({
//  //   moduleId: module.id,
//     selector: 'section-comp',
//     templateUrl: 'section.component.html',
//     styleUrls: ['section.component.css']
// })

// export class SectionComponent implements OnInit, OnChanges {
//     // private _course: Course;
//     // private _section: Section;
//     title: string;
//     content: string;


//     @Input() course: Course;
//     // set course(course: Course) {
//     //     this._course = course;
//     //     console.log('course Updated');
//     //   }

//     // get course(): Course { return this.course; }

//     @Input() section: Section;
//     // set section(section: Section) {
//     //     this._section = section;
//     //     this.title = this._section.title;
//     //     this.content = this._section.content;
//     //     console.log('section updated');
//     // }

//     // get section(): Section { return this.section; }


//     public materials: Material [];
//     public materialRefs: Material [];
//     public materialCollection: {};
//     // public section: Section;

//     public description: string;

//     constructor(private materialService: MaterialService ) {}


//     ngOnInit(): void {

//         this.title = this.course.title;
//         this.description = this.course.description;
//       //  console.log('Materials in section: ', this.section.materials);
//         // console.log('sectionNumber: ' + this.section);
//         // this.section = this.course.sections[this.sectionNumber];
//         // this.materialRefs = this.section.materials;
//         this.loadInMaterials();
//         console.log('This sections materials: ', this.materials);
//     }

//     ngOnChanges(): void {
//         // console.log('changes');
//      //   this.loadInMaterials();
//      this.loadInMaterials();
//      console.log('This sections materials: ', this.materials);
//      }

//     loadInMaterials(): void {
//             this.materials = [];
//             if (this.section.materials) {
//                 this.section.materials.forEach( material => {
//                     const id = material;
//                    // console.log('looking for material: ', id);
//                     const thisMaterial = this.materialService.getMaterialFromMemory(id);
//                 //    console.log('received material: ', thisMaterial);
//                     this.materials.push(thisMaterial);
//             });
//               //  console.log('this materials', this.materials);

//                 this.buildMaterialCollection();
//         }

//     }

//     buildMaterialCollection(): void {
//         this.materialCollection = {};

//         const books = this.materials.filter( (mat) => mat.type === 'book');
//         const videos = this.materials.filter( (mat) => mat.type === 'video');
//         const audios = this.materials.filter( (mat) => mat.type === 'audio');
//         const docs = this.materials.filter( (mat) => mat.type === 'doc');
//         const blocks = this.materials.filter( (mat) => mat.type === 'block');
//         const quotes = this.materials.filter( (mat) => mat.type === 'quote');

//         this.materialCollection = { books, videos, audios, docs, blocks, quotes };
//     }

// }

