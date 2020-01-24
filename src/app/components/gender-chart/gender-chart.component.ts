import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { tap, map } from 'rxjs/operators';
import { countryPopulation } from 'src/app/dummy-data/country-population';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChartService, MultiSeriesData } from 'src/app/services/chart/chart.service';
import { CharacterService } from 'src/app/services/character/character.service';

interface GenderData {
  eyeColor: string;
  gender: string;
}

@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent implements OnInit {
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Eye color';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Number';
  legendTitle: string = 'Legend';
  colorScheme = 'vivid';

  data$: Observable<MultiSeriesData[]>;

  height$: Observable<number>;
  private readonly heightChange: BehaviorSubject<number>;

  constructor(
    private characterService: CharacterService,
    private chartService: ChartService,
  ) {
    this.heightChange = new BehaviorSubject<number>(0);
    this.height$ = this.heightChange.asObservable();

    this.data$ = this.characterService.characters$.pipe(
      map(res => this.chartService.charactersToGenderByEyeColor(res))
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.heightChange.next(event.target.innerHeight / 2.5);
  }

  ngOnInit() {
    this.heightChange.next(window.innerHeight / 2.5);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
