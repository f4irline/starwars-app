import { TestBed } from '@angular/core/testing';

import { MathService } from './math.service';
import { BmiClass } from 'src/app/models/bmi';

describe('MathService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [MathService],
        })
    );

    it('should be created', () => {
        const service: MathService = TestBed.get(MathService);
        expect(service).toBeTruthy();
    });

    it('should calculate bmi', () => {
        const service: MathService = TestBed.get(MathService);
        const height = 185;
        const mass = 75;
        const expected = 21.9;
        const result = service.calculateBmi(mass, height);
        expect(result).toBe(expected);
    });

    it('should throw error', () => {
        const service: MathService = TestBed.get(MathService);
        expect(() => service.calculateBmi(75, 0)).toThrow();
    });

    it('should return normal bmi class', () => {
        const service: MathService = TestBed.get(MathService);
        const result = service.getObesityClass(19.5);
        expect(result).toBe(BmiClass.NORMAL);
    });

    it('should convert 180cm to 1.8m', () => {
        const service: MathService = TestBed.get(MathService);
        const result = service.convertCmToMeters(180);
        expect(result).toBe(1.8);
    });
});
