import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { take, tap } from 'rxjs/operators';
import { CharacterService } from 'src/app/services/character/character.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly loading$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    private characterService: CharacterService,
    private applicationService: ApplicationService,
  ) {
    this.loading$ = this.applicationService.loading$;

    this.reloadData();
  }

  ngOnInit() {
  }

  reloadData(): void {
    this.applicationService.loadingChange.next(true);
    this.apiService.getCharacters(9).pipe(
      take(1),
      tap(() => this.applicationService.loadingChange.next(false)),
    ).subscribe(characters => this.characterService.charactersChange.next(characters));
  }

  reloadPageData(): void {
    const randomPage = Math.floor(Math.random() * 9 + 1);
    this.applicationService.loadingChange.next(true);
    this.apiService.getPageOfCharacters(randomPage).pipe(
      take(1),
      tap(() => this.applicationService.loadingChange.next(false)),
    ).subscribe(characters => this.characterService.charactersChange.next(characters));
  }
}
