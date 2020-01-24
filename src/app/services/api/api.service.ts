import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Character } from 'src/app/models/character';
import { map, tap, takeWhile, mergeMap, switchMap, takeUntil} from 'rxjs/operators';
import { SWAPI } from 'src/app/models/swapi';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private rootUrl: string = 'https://swapi.co/api';

  constructor(
    private http: HttpClient
  ) {}

  getCharacters(pages: number = 1, currPage: number = 1, characters: Character[] = []): Observable<Character[]> {
    const pagesArray: number[] = Array.from({length: pages}, (value, key) => key + 1);

    return forkJoin(
      pagesArray.map(
        page => this.getPageOfCharacters(page)
      ),
    ).pipe(
      map((pages) => [].concat.apply([], pages))
    )
  }

  getPageOfCharacters(page: number): Observable<Character[]> {
    return this.http.get<SWAPI>(`${this.rootUrl}/people/?page=${page}`).pipe(
      map(swapi => swapi.results as Character[])
    )
  }
}
