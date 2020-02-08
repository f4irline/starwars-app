import { Injectable } from '@angular/core';
import { BmiClass } from 'src/app/models/bmi';

@Injectable({
    providedIn: 'root'
})
export class MathService {

    constructor() { }

    calculateBmi(mass: number, height: number): number {
        if (!height) { throw new Error('Can not divide by zero.'); }
        const heightInMeters = this.convertCmToMeters(height);
        const bmi = Math.round(mass / (heightInMeters * heightInMeters) * 10) / 10;
        return bmi;
    }

    getObesityClass(bmi: number): BmiClass {
        return bmi >= 40
            ? BmiClass.CLASS_3_OBESE
            : bmi >= 35
                ? BmiClass.CLASS_2_OBESE
                : bmi >= 30
                    ? BmiClass.CLASS_1_OBESE
                    : bmi >= 25
                        ? BmiClass.OVERWEIGHT
                        : bmi >= 18.5
                            ? BmiClass.NORMAL
                            : BmiClass.UNDERWEIGHT;
    }

    convertCmToMeters(centimeters: number): number {
        return centimeters / 100;
    }
}
