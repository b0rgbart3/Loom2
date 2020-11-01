
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Material } from '../models/material.model';
import { catchError } from 'rxjs/operators';
import { DataError } from '../models/dataerror.model';
import { MaterialService } from '../services/material.service';

@Injectable({
    providedIn: 'root'
  })

export class AllMaterialsResolver implements Resolve <Material[] | DataError> {

    constructor(
        private materialService: MaterialService ) { }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <Material[] | DataError> {


       //  console.log('In the materials-resolver');
        return this.materialService.getMaterials()
        .pipe(
            catchError(err => of(err))
        );

    //     map(materials => { if (materials) { return materials; }
    //     console.log(`Materials were not found`);
    //     this.router.navigate(['/welcome']);
    //     return null; })
    // .catch(error => {
    //     console.log(`Retrieval error: ${error}`);
    //     this.router.navigate(['/welcome']);
    //     return Observable.of(null);
    // });
    }
}
