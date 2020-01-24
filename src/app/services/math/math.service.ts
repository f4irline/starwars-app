import { Injectable } from '@angular/core';
import { BmiClass } from '../chart/chart.service';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  calculateBmi(mass: number, height: number): number {
    const heightInMeters = height / 100;
    return mass / (heightInMeters * heightInMeters);
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
}
