import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';
import { Character } from 'src/app/models/character';
import { MathService } from 'src/app/services/math/math.service';
import { BehaviorSubject, Observable } from 'rxjs';

enum SortByProperty {
  MASS = 'mass',
  HEIGHT = 'height',
  NONE = 'none',
}

interface SortingBy {
  property: SortByProperty;
  descending?: boolean;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  sortByProperty = SortByProperty;
  readonly sortBy$: Observable<SortingBy>;
  private readonly sortByChange: BehaviorSubject<SortingBy>;
  constructor(
    public dialogRef: MatDialogRef<CharacterListComponent>,
    private mathService: MathService,
    @Inject(MAT_DIALOG_DATA) public characters: Character[]) {
      this.sortByChange = new BehaviorSubject<SortingBy>({property: SortByProperty.NONE});
      this.sortBy$ = this.sortByChange.asObservable();
      this.sortByChange.subscribe((sortBy) => {
        if (sortBy.property === SortByProperty.NONE) { return; }
        this.characters = sortBy.property === SortByProperty.MASS 
          ? this.sortByMass(sortBy.descending) 
          : this.sortByHeight(sortBy.descending);
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  getHeightInMetersString(height: string): string {
    const heightInCm = parseFloat(height);
    return isNaN(heightInCm) ? 'Unknown' : `${this.mathService.convertCmToMeters(heightInCm)}m`;
  }

  getMassString(mass: string): string {
    return isNaN(parseFloat(mass)) ? 'Unknown' : `${mass}kg`;
  }

  sortBy(property: SortByProperty): void {
    this.sortByChange.next({
      property: property,
      descending: this.sortByChange.getValue().property ? !this.sortByChange.getValue().descending : true,
    });
  }

  sortByMass(descending?: boolean): Character[] {
    return this.characters.sort((a, b) => {
      const aMass = parseFloat(a.mass);
      const bMass = parseFloat(b.mass);
      if (aMass === bMass) { return 0; }
      if (isNaN(aMass)) { return 1; }
      if (isNaN(bMass)) { return -1; }
      return descending ? bMass - aMass : aMass - bMass;
    });
  }

  sortByHeight(descending?: boolean): Character[] {
    return this.characters.sort((a, b) => {
      const aHeight = parseFloat(a.height);
      const bHeight = parseFloat(b.height);
      if (aHeight === bHeight) { return 0; }
      if (isNaN(aHeight)) { return 1; }
      if (isNaN(bHeight)) { return -1; }
      return descending ? bHeight - aHeight : aHeight - bHeight;
    });
  }

  getIconString(sortBy: SortingBy, property: SortByProperty): string {
    return sortBy.property === property
      ? sortBy.descending
        ? 'arrow-down'
        : 'arrow-up'
      : 'unfold-more';
  }
}
