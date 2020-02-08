import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from 'src/app/models/character';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    readonly characters$: Observable<Character[]>;
    readonly charactersChange: BehaviorSubject<Character[]>;

    constructor() {
        this.charactersChange = new BehaviorSubject<Character[]>([]);
        this.characters$ = this.charactersChange.asObservable();
    }
}
