import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialCollection } from '../../../models/materialcollection.model';
import { Globals } from '../../../../globals';
import { RouterLinkWithHref } from '@angular/router';
import { Material } from '../../../models/material.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  //  moduleId: module.id,
    selector: 'app-quote-component',
    templateUrl: 'quote.component.html',
    styleUrls: ['quote.component.css']
})

export class QuoteComponent implements OnInit {
    @Input() quoteObject: Material;



    constructor( private globals: Globals) {    }

    ngOnInit(): void {

       //  console.log('mat collection: ' + JSON.stringify( this.materialcollection['quotes'] ));

    }


}
