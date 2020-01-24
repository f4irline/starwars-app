import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character';
import { MathService } from '../math/math.service';
import { BmiClass } from 'src/app/models/bmi';
import { FormatService } from '../format/format.service';

export interface SeriesData {
  name: string;
  value: number;
}

export interface MultiSeriesData {
  name: string;
  series: SeriesData[];
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
    sortedBmiClasses = Object.values(BmiClass);
    constructor(
        private mathService: MathService,
        private formatService: FormatService,
    ) { }

    charactersToGenderByEyeColor(characters: Character[]): MultiSeriesData[] {
        const eyeColorsWithValues = new Map<string, SeriesData[]>();
        characters.forEach(char => {
            const gender = char.gender === 'n/a' ? 'None' : this.formatService.capitalizeFirstCharacter(char.gender);
            const eyeColor = this.formatService.capitalizeFirstCharacter(char.eye_color);
            eyeColorsWithValues.has(gender)
                ? eyeColorsWithValues.set(gender, [
                    ...eyeColorsWithValues.get(gender),
                ])
                : eyeColorsWithValues.set(gender, [{
                    name: eyeColor,
                    value: 0,
                }]);

                const existingGender = eyeColorsWithValues.get(gender).find(color => color.name === eyeColor);

                if (existingGender) {
                    existingGender.value += 1;
                } else {
                    eyeColorsWithValues.get(gender).push({
                        name: eyeColor,
                        value: 1,
                    });
                }
        });

        const gendersByEyeColor: MultiSeriesData[] = Array.from(eyeColorsWithValues).map(color => ({
            name: color[0],
            series: color[1],
        }))

        return gendersByEyeColor;
    }

    charactersToBmiData(characters: Character[]): SeriesData[] {
        const bmiWithClasses = new Map<BmiClass, number>();
        
        characters.forEach((char) => {
            const mass = parseFloat(char.mass);
            const height = parseFloat(char.height);
            const bmi = !isNaN(mass) && !isNaN(height) 
                ? this.mathService.calculateBmi(parseFloat(char.mass), parseFloat(char.height)) 
                : undefined;
            const obesityClass = bmi 
                ? this.mathService.getObesityClass(bmi) 
                : BmiClass.UNKNOWN;

            bmiWithClasses.has(obesityClass)
                ? bmiWithClasses.set(obesityClass, bmiWithClasses.get(obesityClass) + 1)
                : bmiWithClasses.set(obesityClass, 1);
        });

        const bmiClasses: SeriesData[] = Array.from(bmiWithClasses).map(bmi => ({
            name: bmi[0],
            value: bmi[1],
        })).sort(this.sortBmiData.bind(this));

        return bmiClasses;
    }

    private sortBmiData(a: SeriesData, b: SeriesData): number {
        return this.sortedBmiClasses.indexOf(a.name as BmiClass) - this.sortedBmiClasses.indexOf(b.name as BmiClass);
    }
}
