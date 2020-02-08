import { TestBed } from '@angular/core/testing';

import { FormatService } from './format.service';

describe('FormatService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: FormatService = TestBed.get(FormatService);
        expect(service).toBeTruthy();
    });

    it('should return string with first letter capitalized', () => {
        const service: FormatService = TestBed.get(FormatService);
        const result = service.capitalizeFirstCharacter('test string');
        expect(result).toBe('Test string');
    });

    it('should return the same string back', () => {
        const service: FormatService = TestBed.get(FormatService);
        const str = 'Test string with capitalized first letter';
        const result = service.capitalizeFirstCharacter(str);
        expect(result).toBe(str);
    });
});
