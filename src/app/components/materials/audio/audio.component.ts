import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../../models/course.model';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.model';
import { Globals } from '../../../../globals';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  //  moduleId: module.id,
    selector: 'app-audio-component',
    templateUrl: 'audio.component.html',
    styleUrls: ['audio.component.css']
})

export class AudioComponent implements OnInit {

    audioSource: string;
    imageURL: string;

    @Input() audioObject: Material;
    constructor( private globals: Globals  ) {

    }

    ngOnInit(): void {
        console.log('In Audio Component:', this.audioObject);
        this.audioSource = this.globals.materialfiles + '/' + this.audioObject.id + '/' + this.audioObject.file; // }
        this.imageURL = this.globals.materialimages + '/' + this.audioObject.id + '/' + this.audioObject.image;
      //  console.log('This image URL: ' + this.imageURL);
    }

    onRightClick(): boolean {
        return false;
    }

}
