import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character';
import { countryPopulationSingle } from 'src/app/dummy-data/country-population-single';
import { MathService } from '../math/math.service';

export enum BmiClass {
    UNDERWEIGHT = 'Underweight',
    NORMAL = 'Normal',
    OVERWEIGHT = 'Overweight',
    CLASS_1_OBESE = 'Class 1 obese',
    CLASS_2_OBESE = 'Class 2 obese',
    CLASS_3_OBESE = 'Class 3 obese',
    UNKNOWN = 'Unknown',
};

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

    constructor(
        private mathService: MathService,
    ) { }

    charactersToGenderByEyeColor(characters: Character[]): MultiSeriesData[] {
        const eyeColorsWithValues = new Map<string, SeriesData[]>();
        characters.forEach(char => {
            eyeColorsWithValues.has(char.eye_color)
                ? eyeColorsWithValues.set(char.eye_color, [
                    ...eyeColorsWithValues.get(char.eye_color),
                ])
                : eyeColorsWithValues.set(char.eye_color, [{
                    name: char.gender,
                    value: 0,
                }]);

                const existingGender = eyeColorsWithValues.get(char.eye_color).find(color => color.name === char.gender);

                if (existingGender) {
                    existingGender.value += 1;
                } else {
                    eyeColorsWithValues.get(char.eye_color).push({
                        name: char.gender,
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
        }));

        return bmiClasses;
    }
}
