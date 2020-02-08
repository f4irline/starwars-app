import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChartService, SeriesData } from 'src/app/services/chart/chart.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { MatDialog } from '@angular/material';
import { CharacterListComponent } from '../character-list/character-list.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
    selector: 'app-bmi-chart',
    templateUrl: './bmi-chart.component.html',
    styleUrls: ['./bmi-chart.component.scss'],
})
export class BmiChartComponent implements OnInit {
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = true;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'BMI';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Number';
    legendTitle: string = 'Legend';
    colorScheme = 'vivid';

    data$: Observable<SeriesData[]>;

    height$: Observable<number>;
    private readonly heightChange: BehaviorSubject<number>;

    constructor(
        private characterService: CharacterService,
        private chartService: ChartService,
        private dialog: MatDialog,
        private overlay: Overlay
    ) {
        this.heightChange = new BehaviorSubject<number>(0);
        this.height$ = this.heightChange.asObservable();

        this.data$ = this.characterService.characters$.pipe(
            map(res => this.chartService.charactersToBmiData(res))
        );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.heightChange.next(event.target.innerHeight / 2.5);
    }

    ngOnInit() {
        this.heightChange.next(window.innerHeight / 2.5);
    }

    onSelect(data: SeriesData): void {
        this.dialog.open(CharacterListComponent, {
            width: '800px',
            data: data.extra.characters,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
        });
    }
}
