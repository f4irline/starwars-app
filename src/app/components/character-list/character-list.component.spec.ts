import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
    CharacterListComponent,
    SortingBy,
    SortByProperty,
} from './character-list.component';
import {
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatIcon,
} from '@angular/material';
import { Character } from 'src/app/models/character';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'mat-icon',
    template: '<span></span>',
})
class MockMatIconComponent {
    @Input() svgIcon: any;
    @Input() fontSet: any;
    @Input() fontIcon: any;
}

describe('CharacterListComponent', () => {
    let component: CharacterListComponent;
    let fixture: ComponentFixture<CharacterListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CharacterListComponent],
            imports: [MatIconModule, MatDividerModule, MatDialogModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ],
        })
            .overrideModule(MatIconModule, {
                remove: {
                    declarations: [MatIcon],
                    exports: [MatIcon],
                },
                add: {
                    declarations: [MockMatIconComponent],
                    exports: [MockMatIconComponent],
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CharacterListComponent);
        component = fixture.componentInstance;
        component.characters = [
            {
                name: 'Luke',
                mass: '85',
                height: '165',
            } as Character,
            {
                name: 'Steve',
                mass: '65',
                height: '185',
            } as Character,
            {
                name: 'Lea',
                mass: '75',
                height: '175',
            } as Character,
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return height in meters string', () => {
        const result = component.getHeightInMetersString('185');
        expect(result).toEqual('1.85m');
    });

    it('should return unknown as height', () => {
        const result = component.getHeightInMetersString('n/a');
        expect(result).toEqual('Unknown');
    });

    it('should return mass string', () => {
        const result = component.getMassString('85');
        expect(result).toEqual('85kg');
    });

    it('should return unknown as mass', () => {
        const result = component.getMassString('n/a');
        expect(result).toEqual('Unknown');
    });

    it('should sort characters by mass in descending order', () => {
        const expectedCharacters: Character[] = [
            {
                name: 'Luke',
                mass: '85',
                height: '165',
            } as Character,
            {
                name: 'Lea',
                mass: '75',
                height: '175',
            } as Character,
            {
                name: 'Steve',
                mass: '65',
                height: '185',
            } as Character,
        ];

        const result = component.sortByMass(true);
        expect(result).toEqual(expectedCharacters);
    });

    it('should sort characters by mass in ascending order', () => {
        const expectedCharacters: Character[] = [
            {
                name: 'Steve',
                mass: '65',
                height: '185',
            } as Character,
            {
                name: 'Lea',
                mass: '75',
                height: '175',
            } as Character,
            {
                name: 'Luke',
                mass: '85',
                height: '165',
            } as Character,
        ];

        const result = component.sortByMass(false);
        expect(result).toEqual(expectedCharacters);
    });

    it('should sort characters by height in descending order', () => {
        const expectedCharacters: Character[] = [
            {
                name: 'Steve',
                mass: '65',
                height: '185',
            } as Character,
            {
                name: 'Lea',
                mass: '75',
                height: '175',
            } as Character,
            {
                name: 'Luke',
                mass: '85',
                height: '165',
            } as Character,
        ];

        const result = component.sortByHeight(true);
        expect(result).toEqual(expectedCharacters);
    });

    it('should initially have sorting by property as none', (done: DoneFn) => {
        component.sortBy$.subscribe(sortBy => {
            expect(sortBy.property).toEqual(SortByProperty.NONE);
            done();
        });
    });

    it('should have sorting by property as mass in descending order', (done: DoneFn) => {
        component['sortByChange'].next({
            property: SortByProperty.MASS,
            descending: true,
        });

        component.sortBy$.subscribe(sortBy => {
            expect(sortBy.property).toEqual(SortByProperty.MASS);
            expect(sortBy.descending).toBeTruthy();
            done();
        });
    });

    it('should return unfold_more icon string', () => {
        const sortingByValue: SortingBy = {
            property: SortByProperty.NONE,
        };
        const result = component.getIconString(
            sortingByValue,
            SortByProperty.MASS
        );
        expect(result).toEqual('unfold_more');
    });

    it('should return arrow_down icon string', () => {
        const sortingByValue: SortingBy = {
            property: SortByProperty.HEIGHT,
            descending: true,
        };

        const result = component.getIconString(
            sortingByValue,
            SortByProperty.HEIGHT
        );
        expect(result).toEqual('arrow_down');
    });

    it('should return arrow_up icon string', () => {
        const sortingByValue: SortingBy = {
            property: SortByProperty.HEIGHT,
            descending: false,
        };

        const result = component.getIconString(
            sortingByValue,
            SortByProperty.HEIGHT
        );
        expect(result).toEqual('arrow_up');
    });
});
