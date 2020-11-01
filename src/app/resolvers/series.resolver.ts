import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { SeriesService } from '../services/series.service';
import { DataError } from '../models/dataerror.model';
import { Series } from '../models/series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesResolver implements Resolve<Series[] | DataError> {

  constructor(
    private seriesService: SeriesService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Series[] | DataError> {
    // Angular automatially subscribes to this get request
    // because it is in a "Resolver".
    const thisSeriesId = route.params.id;
    return this.seriesService.getSeries(thisSeriesId);
  }

}
