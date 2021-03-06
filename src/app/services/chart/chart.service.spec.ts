import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';
import { characters } from 'src/app/dummy-data/characters';
import { FormatService } from '../format/format.service';
import { MathService } from '../math/math.service';

class MockFormatService extends FormatService {
    capitalizeFirstCharacter(str: string): string {
        return str.slice(0, 1).toUpperCase() + str.substr(1);
    }
}

class MockMathService extends MathService {
    calculateBmi(mass: number, height: number): number {
        return Math.round((mass / ((height / 100) * (height / 100))) * 10) / 10;
    }

    convertCmToMeters(height: number): number {
        return 10;
    }
}

describe('ChartService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [
                { provide: FormatService, useClass: MockFormatService },
                { provide: MathService, useClass: MockMathService },
            ],
        })
    );

    it('should be created', () => {
        const service: ChartService = TestBed.get(ChartService);
        expect(service).toBeTruthy();
    });

    it('should return characters mapped to genders by eye colors', () => {
        const service: ChartService = TestBed.get(ChartService);
        const mappedCharacters = service.charactersToGenderByEyeColor(
            characters
        );
        expect(mappedCharacters[0].name).toBe('Male');
        expect(mappedCharacters[1]).toBeUndefined();
        expect(mappedCharacters[0].series[0].value).toBe(3);
        expect(mappedCharacters[0].series[0].name).toBe('Blue');
    });

    it('should return characters mapped by bmi classes', () => {
        const service: ChartService = TestBed.get(ChartService);
        const mappedCharacters = service.charactersToBmiData(characters);
        expect(mappedCharacters[0].name).toBe('Normal');
        expect(mappedCharacters[0].extra.characters[0].name).toBe(
            'Anakin Skywalker'
        );
        expect(mappedCharacters[1].name).toBe('Unknown');
    });
});
