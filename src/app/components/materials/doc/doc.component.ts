import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../../../globals';
// import { ClickOutsideDirective } from '../../_directives/clickOutside.directive';
import { Router } from '@angular/router';
import { Material } from '../../../models/material.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';



@Component({
    // moduleId: module.id,
    selector: 'app-doc-component',
    templateUrl: 'doc.component.html',
    styleUrls: ['doc.component.css'],
})

export class DocComponent implements OnInit {
    @Input() docObject: Material;
    imageURL: string;
    display: boolean;
    big: boolean;
    displayModal: boolean;
    modalURL: string;
    fileURL: string;
    constructor(private globals: Globals, private router: Router) { }

    ngOnInit(): void {
        // console.log('In book component: book = ' + JSON.stringify(this.book));
        console.log('In Doc component, docObject: ', this.docObject);

        this.imageURL = this.globals.materialimages +
            '/' + this.docObject.id + '/' + this.docObject.image;
        this.display = false;
        this.fileURL = this.globals.materialfiles + '/' + this.docObject.id + '/' + this.docObject.file;
    }

    toggleDisplay(): void {
        this.display = !this.display;
    }

    open_modal(): void {

        console.log('Opening modal: ');
        this.displayModal = true;
        this.modalURL = this.fileURL;
    }

    closeModal(truth): void {
        this.displayModal = false;
    }
}

