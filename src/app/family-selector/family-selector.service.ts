import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IFamilyInstance } from './models/family.model';

@Injectable({
  providedIn: 'root'
})
export class FamilySelectorService {

  constructor(
    private http: HttpClient
  ) { }

  getFamilies(): Observable<IFamilyInstance[]> {
    return this.http
      .get<{a: IFamilyInstance[]}>('//5b755724deca780014ec9f65.mockapi.io/api/families/1')
      .pipe(
        map(({ a }) => a),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }
}
