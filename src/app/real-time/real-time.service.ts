import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IRangeInstance } from '../statistics/models/range.model';
import { IAlertsReport } from './models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  constructor(
    private http: HttpClient
  ) { }

  getAlerts(familyId: string, processId: string, range: IRangeInstance): Observable<IAlertsReport> {
    return this.http
      .get<{a: IAlertsReport}>('https://5b755724deca780014ec9f65.mockapi.io/api/alerts/1')
      .pipe(
        map(({ a }) => a),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
