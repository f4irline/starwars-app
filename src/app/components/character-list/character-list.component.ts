import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Character } from 'src/app/models/character';
import { MathService } from 'src/app/services/math/math.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CharacterListComponent>,
    private mathService: MathService,
    @Inject(MAT_DIALOG_DATA) public characters: Character[]) {}

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
}
