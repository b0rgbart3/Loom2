import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../../../globals';
// import { ClickOutsideDirective } from '../../_directives/clickOutside.directive';
import { Router } from '@angular/router';
import { Material } from '../../../models/material.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
   // moduleId: module.id,
    selector: 'app-block-component',
    templateUrl: 'block.component.html',
    styleUrls: ['block.component.css'],
})

export class BlockComponent implements OnInit {
    @Input() block: Material;
    imageURL: string;
    display: boolean;
    big: boolean;
constructor( private globals: Globals, private router: Router) {}

ngOnInit(): void {
 // console.log('In book component: book = ' + JSON.stringify(this.book));
  this.imageURL = this.globals.materialimages +
     '/' + this.block.id + '/' + this.block.image;
  this.display = false;
}

toggleDisplay(): void {
    this.display = !this.display;
}

}

