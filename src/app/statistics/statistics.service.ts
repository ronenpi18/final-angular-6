import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IStatisticsInstance } from './models/data.model';
import { IRangeInstance } from './models/range.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient
  ) { }

  getData(familyId: string, processId: string, range: IRangeInstance): Observable<IStatisticsInstance[]> {
    return this.http
      .get<{a: IStatisticsInstance[]}>('//5b755724deca780014ec9f65.mockapi.io/api/data/1')
      .pipe(
        map(data => data.a),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
