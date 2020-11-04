import { Component, OnInit, SecurityContext } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Section } from '../../models/section.model';
import { FileUploader } from 'ng2-file-upload';

import { Material } from '../../models/material.model';
import { Book } from '../../models/book.model';
import { MaterialService } from '../../services/material.service';
import { Globals } from '../../../globals';
import { MaterialCollection } from '../../models/materialcollection.model';
import { Materialtype } from '../../models/materialtype.model';
import { DomSanitizer } from '@angular/platform-browser';
import _ from 'lodash';
import { Location } from '@angular/common';

@Component({
    //  moduleId: module.id,
    templateUrl: 'course-edit.component.html',
    styleUrls: ['course-edit.component.css']
})

export class CourseEditComponent implements OnInit {
    courseFormGroup: FormGroup;
    sectionsFormArray: FormArray;
    sectionFormGroup: FormGroup;
    // materialFormArray: FormArray[];

    imageFormArray: FormArray[];
    bookFormArray: FormArray[];
    docFormArray: FormArray[];
    videoFormArray: FormArray[];
    audioFormArray: FormArray[];
    quoteFormArray: FormArray[];
    blockFormArray: FormArray[];

    sectionReferences: FormGroup[];
    materialReferences: FormArray[];
    course: Course;
    id: string;
    errorMessage: string;
    image: string;
    imageUrl = '';
    public uploader: FileUploader;
    localImageUrl = '';
    tempName = '';
    thisFile: File;
    allpossiblematerials: Material[];
    docs: Material[];
    books: Material[];
    videos: Material[];
    audios: Material[];
    // extractedBooks: Material[][];
    // extractedDocs: Material[][];
    // extractedVideos: Material[][];
    // extractedAudios: Material[][];
    // extractedQuotes: Material[][];
    // extractedBlocks: Material[][];
    // extractedImages: Material[][];

    bookOptions: Material[];
    docOptions: Material[];
    videoOptions: Material[];
    audioOptions: Material[];
    quoteOptions: Material[];
    blockOptions: Material[];
    imageOptions: Material[];

    matObjRefArray: [];
    existingImage: string;
    uploadedCourseImage: boolean;
    materialFormArrayReferences: FormArray[]; // these are just pointers to the various material form arrays
    materialPlaceholder: string;
    bookPlaceholder: string;
    videoPlaceholder: string;
    docPlaceholder: string;
    audioPlaceholder: string;
    blockPlaceholder: string;
    quotePlaceholder: string;
    imagePlaceholder: string;

    materialTypes: Materialtype[];
    sectionMaterials: MaterialCollection[]; // this is an array of the actual Material Objects that are being
    // referenced by the section(s) -- haven't implemented this yet.

    constructor(
        private router: Router, private activatedRoute: ActivatedRoute,
        private courseService: CourseService, private fb: FormBuilder,
        private materialService: MaterialService, private globals: Globals,
        private sanitizer: DomSanitizer,
        private location: Location) { }

    ngOnInit(): void {

        this.materialTypes = this.globals.materialTypes;
        this.materialPlaceholder = 'Choose a Material';
        this.bookPlaceholder = 'Choose a Book Reference';
        this.docPlaceholder = 'Choose a PDF Document';
        this.audioPlaceholder = 'Choose an audio file';
        this.videoPlaceholder = 'Choose a video file';
        this.quotePlaceholder = 'Choose a quote';
        this.blockPlaceholder = 'Choose a block';
        this.imagePlaceholder = 'Choose an image';

        // this.extractedBooks = [];
        // this.extractedDocs = [];
        // this.extractedVideos = [];
        // this.extractedAudios = [];
        // this.extractedQuotes = [];
        // this.extractedBlocks = [];
        // this.extractedImages = [];

        this.imageFormArray = [];
        this.bookFormArray = [];
        this.docFormArray = [];
        this.videoFormArray = [];
        this.audioFormArray = [];
        this.quoteFormArray = [];
        this.blockFormArray = [];

        // Get the id from the activated route -- and get the data from the resolvers
        this.id = this.activatedRoute.snapshot.params.id;

        // console.log('About to Edit Course ID: ' + this.id);

        this.course = this.activatedRoute.snapshot.data.course[0];
        console.log('Course: ', this.course);


        this.allpossiblematerials = this.activatedRoute.snapshot.data.materials;

        if (this.id !== '0' && (this.course.image !== '')) {
            this.existingImage = this.globals.courseimages + '/' + this.id + '/' + this.course.image;
            //  console.log('Existing image: ' + this.existingImage);
        }

        // console.log(JSON.stringify(this.materials));

        this.uploadedCourseImage = false;
        this.sectionsFormArray = this.fb.array([]);
        this.courseFormGroup = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]],
            imageUploader: '',
            sections: this.sectionsFormArray
        });
        //  console.log('Built course form');

        this.getPossibleImages();
        this.getPossibleVideos();
        this.getPossibleBooks();
        this.getPossibleDocs();
        this.getPossibleAudios();
        this.getPossibleQuotes();
        this.getPossibleBlocks();
        // console.log('gotDocs');

        this.addCourseImage();
        this.deLintMe();
        this.buildSections();

    }

    buildNewSection(i): void{


        this.extractStuff(i);
        this.imageFormArray[i] = this.fb.array([]);
        this.bookFormArray[i] = this.fb.array([]);
        this.docFormArray[i] = this.fb.array([]);
        this.videoFormArray[i] = this.fb.array([]);
        this.audioFormArray[i] = this.fb.array([]);
        this.quoteFormArray[i] = this.fb.array([]);
        this.blockFormArray[i] = this.fb.array([]);

        //  if (!this.course.sections[i]) {
        //      this.course.sections[i] = new Section('', '', '', null, null, i);
        //  }

        //  if (this.course.sections[i] && this.extractedImages[i] ) {
        //      for (let j = 0; j < this.extractedImages[i].length; j++ ) {
        //          this.imageFormArray[i].push(this.buildMaterialsSubSection(this.extractedImages[i][j]['id'] ));
        //      } }
        //  if (this.course.sections[i] && this.extractedVideos[i] ) {
        //      for (let j = 0; j < this.extractedVideos[i].length; j++ ) {
        //          this.videoFormArray[i].push(this.buildMaterialsSubSection(this.extractedVideos[i][j]['id'] ));
        //      } }
        //  if (this.course.sections[i] && this.extractedAudios[i] ) {
        //          for (let j = 0; j < this.extractedAudios[i].length; j++ ) {
        //              this.audioFormArray[i].push(this.buildMaterialsSubSection(this.extractedAudios[i][j]['id'] ));
        //          } }
        //  if (this.course.sections[i] && this.extractedBooks[i] ) {
        //      for (let j = 0; j < this.extractedBooks[i].length; j++ ) {
        //          this.bookFormArray[i].push(this.buildMaterialsSubSection(this.extractedBooks[i][j]['id'] ));
        //      } }

        //  if (this.course.sections[i] && this.extractedDocs[i] ) {
        //      for (let j = 0; j < this.extractedDocs[i].length; j++ ) {
        //          this.docFormArray[i].push(this.buildMaterialsSubSection(this.extractedDocs[i][j]['id']) );
        //      } }

        //  if (this.course.sections[i] && this.extractedQuotes[i] ) {
        //      for (let j = 0; j < this.extractedQuotes[i].length; j++ ) {
        //          this.quoteFormArray[i].push(this.buildMaterialsSubSection(this.extractedQuotes[i][j]['id']) );
        //      } }

        //  if (this.course.sections[i] && this.extractedBlocks[i] ) {
        //          for (let j = 0; j < this.extractedBlocks[i].length; j++ ) {
        //              this.blockFormArray[i].push(this.buildMaterialsSubSection(this.extractedBlocks[i][j]['id']) );
        //          } }

        // this.sectionMaterials[i] = this.materialService.sortMaterials(this.course.sections[i].materials);
        let title = '';
        let content = '';
        if (this.course.sections[i]) {
            if (this.course.sections[i].title) { title = this.course.sections[i].title; }
            if (this.course.sections[i].content) { content = this.course.sections[i].content; }
        }
        this.sectionReferences[i] = this.fb.group({
            title,
            content,
            // materials: this.materialFormArray[i],
            images: this.imageFormArray[i],
            videos: this.videoFormArray[i],
            audios: this.audioFormArray[i],
            books: this.bookFormArray[i],
            docs: this.docFormArray[i],
            quotes: this.quoteFormArray[i],
            blocks: this.blockFormArray[i]

        });
        this.sectionsFormArray.push(this.sectionReferences[i]);

    }
    buildSections(): void {
        // console.log('building sections.');
        this.sectionReferences = [];

        // this.materialFormArray = [];
        this.imageFormArray = [];
        this.bookFormArray = [];
        this.docFormArray = [];
        this.videoFormArray = [];
        this.audioFormArray = [];
        this.quoteFormArray = [];
        this.blockFormArray = [];

        for (let i = 0; i < this.course.sections.length; i++) {

            this.buildNewSection(i);

        }

        this.populateForm();
    }

    get sections(): any {
        return this.courseFormGroup.get('sections');
    }

    buildSection(): FormGroup {
        return this.fb.group({
            title: '',
            content: '',
            images: [],
            videos: [],
            audios: [],
            books: [],
            docs: [],
            quotes: [],
            blocks: []
        });
    }

    buildMaterialsSubSection(value): any {
        return this.fb.group({
            material: value
        });
    }



    extract(sectionNumber, type): any {
        const extractedArray = [];
        if (this.course && this.course.sections &&
            this.course.sections[sectionNumber] &&
            this.course.sections[sectionNumber].materials) {

            this.course.sections[sectionNumber].materials.forEach((material) => {
                const matID = material;
                //   console.log('mat: ' + JSON.stringify(matObj));
                if (matID) {
                    const foundObj = this.allpossiblematerials.find(materialObject => (materialObject.id === matID));

                    if (foundObj) {
                        //    console.log( ' Found: ' + JSON.stringify(foundObj));
                        if (foundObj.type === type) {
                            extractedArray.push(foundObj);
                        }
                    }
                }
            });



        }

        //      console.log('my extracted Array: ' + JSON.stringify(extractedArray));
        return extractedArray;

    }
    // We want an array of books that has been selected for this SECTION --
    // so we look through all of the materials for this section, and extract the ones that are 'books'
    extractStuff(sectionNumber): void {
        // const offSetSectionNumber = sectionNumber + 1;
        // this.extractedImages[sectionNumber] = [];
        // this.extractedImages[sectionNumber] = this.extract(sectionNumber, 'image');
        // this.extractedBooks[sectionNumber] = [];
        // this.extractedBooks[sectionNumber] = this.extract(sectionNumber, 'book');
        // this.extractedDocs[sectionNumber] = [];
        // this.extractedDocs[sectionNumber] = this.extract(sectionNumber, 'doc');
        // this.extractedVideos[sectionNumber] = [];
        // this.extractedVideos[sectionNumber] = this.extract(sectionNumber, 'video');
        // this.extractedAudios[sectionNumber] = [];
        // this.extractedAudios[sectionNumber] = this.extract(sectionNumber, 'audio');
        // this.extractedQuotes[sectionNumber] = [];
        // this.extractedQuotes[sectionNumber] = this.extract(sectionNumber, 'quote');
        // this.extractedBlocks[sectionNumber] = [];
        // this.extractedBlocks[sectionNumber] = this.extract(sectionNumber, 'block');

    }


    fileChange(event): void {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            this.thisFile = file;
        }
    }

    populateForm(): void {
        this.courseFormGroup.patchValue({
            title: this.course.title,
            description: this.course.description
        });
    }

    deLintMe(): void {
        console.log('In deLintMe, course: ', this.course);

        this.course.sections.forEach((section) => {
            const sc = section.content;
            if (sc) {
                const editedSC = sc.replace(/<br>/g, '\n');
                section.content = editedSC;
            }
        });
    }

    lintMe(combinedCourseObject): any {
        let lintedModel = combinedCourseObject;
        //   console.log('LINTING: ');

        combinedCourseObject.sections.forEach((section) => {
            const sectionContent = section.content;

            let LintedSectionContent = sectionContent;
            if (sectionContent) {
                LintedSectionContent = sectionContent.replace(/\n/g, '<br>');
            }
            section.content = LintedSectionContent;
            //    console.log(combinedCourseObject.sections[i].content);
        });

        lintedModel = combinedCourseObject;
        return lintedModel;
    }

    postCourse(): void {

        if (this.uploadedCourseImage) {
            this.course.image = this.image;
        }
        // This is Deborah Korata's way of merging our data model with the form model
        let combinedCourseObject = Object.assign({}, this.course, this.courseFormGroup.value);
        // const combinedCourseObject = this.courseFormGroup.value;

        // add a dummy "section Zero" to the front of the sections array -- (which we use as the course syllabus page)
        //   combinedCourseObject.sections.unshift({ 'sectionNumber' : '0' });

        // I want to consolidate all the materials into one array for each section
        for (let j = 0; j < combinedCourseObject.sections.length; j++) {

            combinedCourseObject.sections[j].materials = [];
            const audioGroup = combinedCourseObject.sections[j].audios;
            combinedCourseObject.sections[j].materials = combinedCourseObject.sections[j].materials.concat(audioGroup);
            const videoGroup = combinedCourseObject.sections[j].videos;
            combinedCourseObject.sections[j].materials = combinedCourseObject.sections[j].materials.concat(videoGroup);
            delete combinedCourseObject.sections[j].videos;
            const bookGroup = combinedCourseObject.sections[j].books;
            combinedCourseObject.sections[j].materials = combinedCourseObject.sections[j].materials.concat(bookGroup);
            delete combinedCourseObject.sections[j].books;
            const docGroup = combinedCourseObject.sections[j].docs;
            combinedCourseObject.sections[j].materials = combinedCourseObject.sections[j].materials.concat(docGroup);
            delete combinedCourseObject.sections[j].docs;
            const quoteGroup = combinedCourseObject.sections[j].quotes;
            combinedCourseObject.sections[j].materials = combinedCourseObject.sections[j].materials.concat(quoteGroup);
            delete combinedCourseObject.sections[j].quotes;
            const blockGroup = combinedCourseObject.sections[j].blocks;
            combinedCourseObject.sections[j].materials = combinedCourseObject.sections[j].materials.concat(blockGroup);
            delete combinedCourseObject.sections[j].blocks;
            const imageGroup = combinedCourseObject.sections[j].images;
            combinedCourseObject.sections[j].materials = combinedCourseObject.sections[j].materials.concat(imageGroup);

            delete combinedCourseObject.sections[j].audios;
            delete combinedCourseObject.sections[j].videos;
            delete combinedCourseObject.sections[j].books;
            delete combinedCourseObject.sections[j].docs;
            delete combinedCourseObject.sections[j].quotes;
            delete combinedCourseObject.sections[j].blocks;
            delete combinedCourseObject.sections[j].images;

            // I also want to strip out the individual objects and just store an array of ID #s.
            if (combinedCourseObject.sections[j].materials) {
                const IDArray = combinedCourseObject.sections[j].materials.map(material => {
                    if (material && material.material) {
                        return material.material;
                    } else { return null; }
                });
                combinedCourseObject.sections[j].materials = IDArray;
            }
            // we also need to store the SectionNumber -- although this might eventually already be part of the model
            // after / if we add the ability to move sections around.  For now - we'll just store the index.
            combinedCourseObject.sections[j].sectionNumber = j;


            //    console.log('Section' + j + ': ' + JSON.stringify(combinedCourseObject.sections[j]) );
        }


        // console.log( 'Posting course: ' + JSON.stringify(combinedCourseObject) );

        const lintedModel = this.lintMe(combinedCourseObject);
        combinedCourseObject = lintedModel;
        combinedCourseObject.sections[0] = { sectionNumber: 0 };
        combinedCourseObject.sections[0].materials = [];

        if (this.course.id === '0') {
            this.courseService.createCourse(combinedCourseObject).subscribe(
                (val) => {

                },
                response => {
                    this.reset();
                    this.router.navigate(['/admin/classes']);
                },
                () => {
                    this.reset();
                    this.router.navigate(['/admin/classes']);
                }
            );
        } else {
            // Validate stuff here
            this.courseService
                .updateCourse(combinedCourseObject).subscribe(
                    (val) => {

                    },
                    response => {
                        this.reset(); this.router.navigate(['/admin/classes']);
                    },
                    () => {
                        this.reset();
                        this.router.navigate(['/admin/classes']);
                    }
                );
        }
    }

    reset(): void {
        this.courseFormGroup.reset();
    }

    getPossibleQuotes(): any {

        this.materialService.getDynamicMaterials(0, 'quote').subscribe(
            quotes => { this.quoteOptions = this.sortObjs(quotes); },
            error => this.errorMessage = error);
    }

    getPossibleImages(): any {
        this.materialService.getDynamicMaterials(0, 'image').subscribe(
            images => { this.imageOptions = this.sortObjs(images); },
            error => this.errorMessage = error);
    }
    getPossibleVideos(): any{

        this.materialService.getDynamicMaterials(0, 'video').subscribe(
            videos => { this.videoOptions = this.sortObjs(videos); },
            error => this.errorMessage = error);
    }
    getPossibleAudios(): any {

        this.materialService.getDynamicMaterials(0, 'audio').subscribe(
            audios => { this.audioOptions = this.sortObjs(audios); },
            error => this.errorMessage = error);
    }
    getPossibleBooks(): any {

        this.materialService.getDynamicMaterials(0, 'book').subscribe(
            books => {
                this.bookOptions = this.sortObjs(books);
            },
            error => this.errorMessage = error);
    }
    getPossibleBlocks(): any {

        this.materialService.getDynamicMaterials(0, 'block').subscribe(
            blocks => {
                this.blockOptions = this.sortObjs(blocks);
            },
            error => this.errorMessage = error);
    }
    getPossibleDocs(): any {

        this.materialService.getDynamicMaterials(0, 'doc').subscribe(
            docs => {
                this.docOptions = this.sortObjs(docs);
                console.log('possible docs: ');
                this.docOptions.map(doc => console.log(doc.title));
            },
            error => this.errorMessage = error);
    }

    sortObjs(objs): any {
        const sortedObjs = _.sortBy(objs, item => item.title);
        return sortedObjs;
    }

    addSection(): void {
        let newSection = 1;
        if (this.course.sections && this.course.sections.length > 0) {
            console.log('At least one section already exists.');
            newSection = this.course.sections.length;
            this.course.sections.push(new Section('', '', [], null, newSection));
            console.log('About to build a new section:' + newSection);
            this.buildNewSection(newSection);
        } else {
            newSection = 0;
            this.course.sections.push(new Section('', '', [], null, newSection));
            this.buildNewSection(0);
            newSection = 1;
            this.course.sections.push(new Section('', '', [], null, newSection));
            this.buildNewSection(1);
        }

    }


    addQuote(i): void {
        if (this.quoteFormArray[i]) {
            this.quoteFormArray[i].push(this.buildMaterialsSubSection(''));
        } else {
            this.quoteFormArray[i] = this.fb.array([]);
            this.quoteFormArray[i].push(this.buildMaterialsSubSection(''));
        }
    }

    addImage(i): void {
        if (this.imageFormArray[i]) {
            this.imageFormArray[i].push(this.buildMaterialsSubSection(''));
        } else {
            this.imageFormArray[i] = this.fb.array([]);
            this.imageFormArray[i].push(this.buildMaterialsSubSection(''));
        }
    }

    addVideo(i): void {
        if (this.videoFormArray[i]) {
            this.videoFormArray[i].push(this.buildMaterialsSubSection(''));
        } else {
            this.videoFormArray[i] = this.fb.array([]);
            this.videoFormArray[i].push(this.buildMaterialsSubSection(''));
        }
    }
    addAudio(i): void {
        if (this.audioFormArray[i]) {
            this.audioFormArray[i].push(this.buildMaterialsSubSection(''));
        } else {
            this.audioFormArray[i] = this.fb.array([]);
            this.audioFormArray[i].push(this.buildMaterialsSubSection(''));
        }
    }
    addBlock(i): void {
        if (this.blockFormArray[i]) {
            this.blockFormArray[i].push(this.buildMaterialsSubSection(''));
        } else {
            this.blockFormArray[i] = this.fb.array([]);
            this.blockFormArray[i].push(this.buildMaterialsSubSection(''));
        }
    }
    addBook(i): void {
        // console.log('Adding Book to section: ' + i);

        if (this.bookFormArray[i]) {
            console.log('FormArray for section #' + i + ' exists.');
            this.bookFormArray[i].push(this.buildMaterialsSubSection(''));
        } else {
            console.log('Creating FormArray for section #' + i);
            this.bookFormArray[i] = this.fb.array([]);
            this.bookFormArray[i].push(this.buildMaterialsSubSection(''));
        }
        //  console.log('Done building bookFormArray');
    }
    addDoc(i): void {
        //   console.log('Adding PDF Document to section: ' + i);

        if (this.docFormArray[i]) {
            console.log('FormArray for section #' + i + ' exists.');
            this.docFormArray[i].push(this.buildMaterialsSubSection(''));
        } else {
            console.log('Creating FormArray for section #' + i);
            this.docFormArray[i] = this.fb.array([]);
            this.docFormArray[i].push(this.buildMaterialsSubSection(''));
        }
        //  console.log('Done building bookFormArray');
    }

    killSection(i): void {
        const k = confirm('Are you sure you want to delete this whole section, and all the related reference materials?');
        if (k) {
            this.sections.removeAt(i);
        }
    }


    // killBook(i, k) {
    //     this.bookFormArray[i].removeAt(k);
    // }

    // killBlock(i, k) {
    //     this.blockFormArray[i].removeAt(k);
    // }

    // killImage(i, k) {
    //     this.imageFormArray[i].removeAt(k);
    // }

    // killDoc(i, k) {
    //     this.docFormArray[i].removeAt(k);
    // }

    // killVideo(i, k) {
    //     this.videoFormArray[i].removeAt(k);
    // }

    // killQuote(i, k) {
    //     this.quoteFormArray[i].removeAt(k);
    // }

    // killAudio(i, k) {
    //     this.audioFormArray[i].removeAt(k);
    // }

    addCourseImage(): void {

        console.log('adding course image');
        const urlWithQuery = this.globals.postcourseimages + '?id=' + this.id;
        this.uploader = new FileUploader({
            url: urlWithQuery,
            disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
            formatDataFunctionIsAsync: true,
            formatDataFunction: async (item) => {
              return new Promise( (resolve, reject) => {
                resolve({
                  name: item._file.name,
                  length: item._file.size,
                  contentType: item._file.type,
                  date: new Date()
                });
              });
            }

        });
        // this.uploader.onAfterAddingFile = (fileItem) => {
        //     const url = (window.URL) ? window.URL.createObjectURL(fileItem._file)
        //         : (window as any).webkitURL.createObjectURL(fileItem._file);
        //     this.localImageUrl = url;
        //     this.uploader.queue[0].upload();
        //     this.uploadedCourseImage = true;
        // };
        // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //     this.tempName = this.uploader.queue[0].file.name;
        //     this.image = this.tempName;
        //     this.imageUrl = this.globals.courseimages + '/' +
        //         this.course.id + '/' + this.image;
        //     this.uploader.queue[0].remove();
        // };
    }

    escapeHtml(unsafe): void {
        return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    moveUp(i): void {
        if (i > 1) {
            console.log('moving up: ' + i);


            // const dummySection = this.sectionReferences[i - 1];
            // const dummyFormArray = this.sectionsFormArray[i - 1];
            // this.sectionReferences[i - 1] = this.sectionReferences[i];
            // this.sectionsFormArray[i - 1] = this.sectionsFormArray[i];
            // this.sectionReferences[i] = dummySection;
            // this.sectionsFormArray[i] = dummyFormArray;
            // this.courseFormGroup.patchValue({sections: this.sectionsFormArray });

        }
    }
    closer(): void{
        this.router.navigate(['/admin/classes']);
        // this._location.back();

        // // this.router.navigate(['/coursebuilder']);
    }
    removeCourse(): void {
        this.courseService.removeCourse(this.course).subscribe((val) => {
            this.router.navigate(['/admin/classes']);
        }, response => { this.router.navigate(['/admin/classes']); },
            () => { this.router.navigate(['/admin/classes']); });

    }
    deleteCourse(courseId): void {
        const result = confirm('Are you sure you want to delete this course,' +
            ' and All of it\'s related sections, width ID: ' + courseId + '? ');
        if (result) {
            console.log('Got the ok to delete the course.');

            this.courseService.deleteCourse(courseId).subscribe(
                (data) => {
                    console.log('Got back from the Course Service.');
                    this.router.navigate(['/coursebuilder']);
                },
                error => {
                    this.errorMessage = error;
                    // This is a work-around for a HTTP error message I was getting even when the
                    // course was successfully deleted.
                    if (error.status === 200) {
                        console.log('Got back from the Course Service.');
                        this.router.navigate(['/coursebuilder']);
                    } else {
                        console.log('Error: ' + JSON.stringify(error));
                    }
                });
        }
    }

}

// import { Component, OnInit } from '@angular/core';
// import { Course } from '../../models/course.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CourseService } from '../../services/course.service';
// import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
// import { Section } from '../../models/section.model';
// import { FileUploader } from 'ng2-file-upload';
// import { Material } from '../../models/material.model';
// import { MaterialService } from '../../services/material.service';
// const COURSE_IMAGE_PATH = 'http://localhost:3100/courseimages';

// @Component({
//    // moduleId: module.id,
//     templateUrl: 'course-edit.component.html',
//     styleUrls: ['course-edit.component.css']
// })

// export class CourseEditComponent implements OnInit {

//     courseFormGroup: FormGroup;
//     sectionsFormArray: FormArray;
//     sectionFormGroup: FormGroup;
//     materialFormArray: FormArray[];
//     sectionReferences: FormGroup[];
//     materialReferences: FormArray[];
//     course: Course;
//     courseId: number;
//     errorMessage: string;
//     image: string;
//     imageUrl = '';
//     public uploader: FileUploader;
//     localImageUrl = '';
//     tempName = '';
//     thisFile: File;
//     materials: Material[];
//     matObjRefArray: [];
//     existingImage: string;
//     uploadedCourseImage: boolean;
//     materialFormArrayReferences: FormArray[]; // these are just pointers to the various material form arrays

//     constructor(
//         private router: Router, private activatedRoute: ActivatedRoute,
//         private courseService: CourseService, private fb: FormBuilder, private materialService: MaterialService) { }

//     ngOnInit(): void {

//         // Get the id from the activated route -- and get the data from the resolvers
//         this.courseId = this.activatedRoute.snapshot.params.courseId;
//         this.course = this.activatedRoute.snapshot.data.course[0];
//         this.materials = this.activatedRoute.snapshot.data.materials;

//         console.log(JSON.stringify(this.materials));
//         this.existingImage = COURSE_IMAGE_PATH + '/' + this.courseId + '/' + this.course.image;

//         this.uploadedCourseImage = false;
//         this.sectionsFormArray = this.fb.array([]);
//         this.courseFormGroup = this.fb.group({
//             title: ['', [Validators.required, Validators.minLength(3)]],
//             description: ['', [Validators.required]],
//             imageUploader: '',
//             sections: this.sectionsFormArray
//         });
//         this.addCourseImage();
//         this.buildSections();
//     }

//     buildSections(): void {
//         this.sectionReferences = [];
//         if (this.course.sections) {
//             this.materialFormArray = [];
//             this.course.sections.forEach( (section, index ) => {
//                 this.materialFormArray[index] = this.fb.array([]);
//                 if (section.materials) {

//                     section.materials.forEach( (material) => {
//                         this.materialFormArray[index].push(this.buildMaterialsSubSection(material));
//                     });

//                 }
//                 this.sectionReferences[index] = this.fb.group({
//                     title: section.title,
//                     content: section.content,
//                     materials: this.materialFormArray[index]
//                 });
//                 this.sectionsFormArray.push(this.sectionReferences[index]);
//             });
//         }
//         this.populateForm();
//     }

//     get sections(): any {
//         return this.courseFormGroup.get('sections');
//     }

//     buildSection(): FormGroup {
//         return this.fb.group({
//             title: '',
//             content: ''
//         });
//     }

//     buildMaterialsSubSection(value): any {
//         return this.fb.group({
//             material: value
//         });
//     }

//     fileChange(event): any {
//         const fileList: FileList = event.target.files;
//         if (fileList.length > 0) {
//             const file: File = fileList[0];
//             this.thisFile = file;
//         }
//     }

//     populateForm(): void {
//         this.courseFormGroup.patchValue({ title: this.course.title, description: this.course.description });
//     }

//     getCourse(id: number): any {
//         this.courseService.getCourse(id).subscribe(
//             course => {
//                 this.course = course[0];
//                 // console.log('got course info :' + JSON.stringify(course) );
//                 this.image = this.course.image;
//                 this.imageUrl = COURSE_IMAGE_PATH + '/' + this.course.id + '/' + this.image;
//             },
//             error => this.errorMessage = error
//         );
//     }

//     postCourse(): void {

//         if (this.uploadedCourseImage) {
//             this.course.image = this.image;
//         }
//         // This is Deborah Korata's way of merging our data model with the form model
//         const combinedCourseObject = Object.assign({}, this.course, this.courseFormGroup.value);
//         // const combinedCourseObject = this.courseFormGroup.value;

//         console.log('Posting course: ' + JSON.stringify(combinedCourseObject));

//         if (this.course.id === '0') {
//             this.courseService.createCourse(combinedCourseObject).subscribe(
//                 (val) => {

//                 },
//                 response => {
//                 },
//                 () => {
//                     this.router.navigate(['/admin']);
//                 }
//             );
//         } else {
//             // Validate stuff here
//             this.courseService
//                 .updateCourse(combinedCourseObject).subscribe(
//                     (val) => {

//                     },
//                     response => {
//                     },
//                     () => {
//                         this.router.navigate(['/admin']);
//                     }
//                 );
//         }
//     }

//     addSection(): void {
//         this.sectionsFormArray.push(this.buildSection());
//     }

//     addMaterial(i): void {
//         this.materialFormArray[i].push(this.buildMaterialsSubSection(''));
//     }

//     killSection(i): void {
//         const k = confirm('Are you sure you want to delete this whole section, and all the related reference materials?');
//         if (k) {
//             this.sections.removeAt(i);
//         }
//     }

//     killMaterial(i, j): void {
//         //  console.log (' section #' + i + ', material#' + j);
//         this.materialFormArray[i].removeAt(j);
//     }


//     addCourseImage(): void {
//         const urlWithQuery = 'http://localhost:3100/api/courseimages?id=' + this.courseId;
//         this.uploader = new FileUploader({ url: urlWithQuery });
//         this.uploader.onAfterAddingFile = (fileItem) => {
//             const url = (window.URL) ? window.URL.createObjectURL(fileItem._file)
//                 : (window as any).webkitURL.createObjectURL(fileItem._file);
//             this.localImageUrl = url;
//             this.uploader.queue[0].upload();
//             this.uploadedCourseImage = true;
//         };
//         this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
//             this.tempName = this.uploader.queue[0].file.name;
//             this.image = this.tempName;
//             this.imageUrl = COURSE_IMAGE_PATH + '/' + this.course.courseId + '/' + this.image;
//             this.uploader.queue[0].remove();
//         };
//     }
// }
