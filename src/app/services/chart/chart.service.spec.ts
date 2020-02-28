import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';
import { characters } from 'src/app/dummy-data/characters';
import { FormatService } from '../format/format.service';
import { MathService } from '../math/math.service';

describe('ChartService', () => {
    let capitalizeFirstCharacterSpy: jest.SpyInstance;
    let mathServiceSpy: jest.Mocked<{
        calculateBmi: jest.Mock;
        convertCmToMeters: jest.Mock;
        getObesityClass: jest.Mock;
    }>;

    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: MathService,
                    useValue: {
                        calculateBmi: jest.fn(),
                        convertCmToMeters: jest.fn(),
                        getObesityClass: jest.fn(),
                    },
                },
            ],
        })
    );

    beforeEach(() => {
        capitalizeFirstCharacterSpy = jest
            .spyOn(FormatService.prototype, 'capitalizeFirstCharacter')
            .mockImplementation(
                (str: string) => str.slice(0, 1).toUpperCase() + str.substr(1)
            );

        mathServiceSpy = TestBed.get(MathService);

        mathServiceSpy.calculateBmi.mockImplementation(
            (mass: number, height: number) =>
                Math.round((mass / ((height / 100) * (height / 100))) * 10) / 10
        );

        mathServiceSpy.convertCmToMeters.mockImplementation(
            (centimeters: number) => centimeters / 100
        );

        mathServiceSpy.getObesityClass.mockReturnValue('Normal');
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
        expect(mathServiceSpy.calculateBmi).toHaveBeenCalled();
    });
});
