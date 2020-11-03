import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialCollection } from '../../../models/materialcollection.model';
import { Globals } from '../../../../globals';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  //  moduleId: module.id,
    selector: 'app-material-collection',
    templateUrl: 'material-collection.component.html',
    styleUrls: ['material-collection.component.css']
})

export class MaterialCollectionComponent implements OnInit {
    @Input() materialcollection: MaterialCollection;

    displayModal: boolean;
    modalURL: string;


    constructor( private globals: Globals) {    }

    ngOnInit(): void {

      console.log('In the Material Collection Component: ', this.materialcollection);
      this.displayModal = false;
      this.modalURL = '';

      if (this.materialcollection.docs) {
          console.log('found documents :' + this.materialcollection.docs.length);

          this.materialcollection.docs.forEach( matCol => {
            if (matCol.image && (matCol.image !== undefined)) {
              //  this.materialcollection.docs[i].imageURL = this.globals.materialimages + '/' +
                //  this.materialcollection.docs[i].id + '/' + encodeURI(this.materialcollection.docs[i].image);
               }
            if (matCol.file && ( matCol.file !== undefined)) {
               // this.materialcollection.docs[i].fileURL = this.globals.materialfiles + '/' +
                //  this.materialcollection.docs[i].id + '/' + this.materialcollection.docs[i].file;
               }
          });

        }
    }


  open_modal( object ): void {
     // window.open(URL, '_blank');

     console.log('Opening modal: ' + JSON.stringify( object ));
     this.displayModal = true;
     this.modalURL = object.fileURL;
  }

  closeModal( truth ): void {
    this.displayModal = false;
  }
}
