import { ComponentFixture } from "@angular/core/testing";
import { of, from, Observable, pipe } from "rxjs";
import { map, tap, flatMap } from "rxjs/operators";

export function executeAndDetectChanges(fixture: ComponentFixture<any>, fn: () => any): Observable<any> {
    return of(fn()).pipe(
        tap((a) => fixture.detectChanges()),
        flatMap((fnResult: any) => from(fixture.whenStable()).pipe(
            map(() => fnResult)
        ))
    );
}