import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { Character } from 'src/app/models/character';

describe('CharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });

  it('should return empty characters array', (done: DoneFn) => {
    const service: CharacterService = TestBed.get(CharacterService);
    service.characters$.subscribe((characters) => {
      expect(characters.length).toBe(0);
      done();
    })
  });

  it('should return Character 2', (done: DoneFn) => {
    const service: CharacterService = TestBed.get(CharacterService);
    service.charactersChange.next([{
      name: 'Character 1',
      height: '180',
      mass: '80'
    } as Character, {
      name: 'Character 2',
      height: '155',
      mass: '55',
    } as Character, {
      name: 'Character 3',
      height: 'Unknown',
      mass: 'Unknown'
    } as Character]);
    service.characters$.subscribe((characters) => {
      expect(characters[1]).toEqual(
        jasmine.objectContaining({name: 'Character 2'})
      );
      done();
    });
  });
});
