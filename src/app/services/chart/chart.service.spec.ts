import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';
import { characters } from 'src/app/dummy-data/characters';
import { FormatService } from '../format/format.service';
import { MathService } from '../math/math.service';

class MockMathService extends MathService {
    calculateBmi(mass: number, height: number): number {
        return Math.round((mass / ((height / 100) * (height / 100))) * 10) / 10;
    }

    convertCmToMeters(centimeters: number): number {
        return centimeters / 100;
    }
}

describe('ChartService', () => {
    let capitalizeFirstCharacterSpy: jasmine.Spy;
    let mockMathService: jasmine.SpyObj<{
        calculateBmi: jasmine.Spy;
        getObesityClass: jasmine.Spy;
        convertCmToMeters: jasmine.Spy;
    }>;
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [
                ChartService,
                FormatService,
                {
                    provide: MathService,
                    useValue: jasmine.createSpyObj('MathService', [
                        'calculateBmi',
                        'getObesityClass',
                        'convertCmToMeters',
                    ]),
                },
            ],
        })
    );

    beforeEach(() => {
        capitalizeFirstCharacterSpy = spyOn(
            FormatService.prototype,
            'capitalizeFirstCharacter'
        ).and.callFake(str => str.slice(0, 1).toUpperCase() + str.substr(1));

        mockMathService = TestBed.get(MathService);
        mockMathService.calculateBmi.and.callFake(
            (mass: number, height: number) =>
                Math.round((mass / ((height / 100) * (height / 100))) * 10) / 10
        );

        mockMathService.convertCmToMeters.and.callFake(
            centimeters => centimeters / 100
        );

        mockMathService.getObesityClass.and.returnValue('Normal');
    });

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
        expect(capitalizeFirstCharacterSpy).toHaveBeenCalled();
    });

    it('should return characters mapped by bmi classes', () => {
        const service: ChartService = TestBed.get(ChartService);
        const mappedCharacters = service.charactersToBmiData(characters);
        expect(mappedCharacters[0].name).toBe('Normal');
        expect(mappedCharacters[0].extra.characters[0].name).toBe(
            'Anakin Skywalker'
        );
        expect(mappedCharacters[1].name).toBe('Unknown');
        expect(mockMathService.calculateBmi).toHaveBeenCalled();
    });
});
