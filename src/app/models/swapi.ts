import { Character } from './character';

export interface SWAPI {
    count: number;
    next: string | undefined;
    previous: string | undefined;
    results: Character[];
}
