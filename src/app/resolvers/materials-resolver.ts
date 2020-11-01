import { Component, OnInit, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { ContentChart } from '../models/contentchart.model';
import { CourseService } from '../services/course.service';
import { ClassService } from '../services/class.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClassModel } from '../models/classModel.model';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/material.model';
import { MaterialCollection } from '../models/materialcollection.model';
import { DataError } from '../models/dataerror.model';


@Injectable({
  providedIn: 'root'
})
export class MaterialsResolver implements Resolve<Material[] | DataError> {

  constructor(
    private materialService: MaterialService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Material[] | DataError> {
    // Angular automatially subscribes to this get request
    // because it is in a "Resolver".

    return this.materialService.getAllMaterials()
      .pipe(
        catchError(err => of(err))
      );
  }
}
