import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../../../globals';
// import { ClickOutsideDirective } from '../../_directives/clickOutside.directive';
import { Router } from '@angular/router';
import { Material } from '../../../models/material.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
    // moduleId: module.id,
    selector: 'app-image-component',
    templateUrl: 'image.component.html',
    styleUrls: ['image.component.css'],
})

export class ImageComponent implements OnInit {
    @Input() imageObject: Material;
    imageURL: string;

constructor( private globals: Globals, private router: Router) {}

ngOnInit(): void  {

    this.imageURL = this.globals.materialimages + '/' + this.imageObject.id + '/' + this.imageObject.image;

}

}
