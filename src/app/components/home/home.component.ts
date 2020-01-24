import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { take } from 'rxjs/operators';
import { CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private characterService: CharacterService,
  ) {
    this.apiService.getCharacters(5).pipe(
      take(1),
    ).subscribe(characters => this.characterService.charactersChange.next(characters));
  }

  ngOnInit() {
  }

}
