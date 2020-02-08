import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    readonly loading$: Observable<boolean>;
    readonly loadingChange: BehaviorSubject<boolean>;
    constructor() {
        this.loadingChange = new BehaviorSubject<boolean>(true);
        this.loading$ = this.loadingChange.asObservable();
    }
}
