import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ChartService, MultiSeriesData } from 'src/app/services/chart/chart.service';
import { CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent implements OnInit {
  eyeColorSearch$: Observable<string>;
  eyeColorSearchChange: BehaviorSubject<string>;

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

    this.eyeColorSearchChange = new BehaviorSubject<string>('');
    this.eyeColorSearch$ = this.eyeColorSearchChange.asObservable();

    this.data$ = combineLatest(
      this.eyeColorSearch$,
      this.characterService.characters$,
    ).pipe(
      map(([term, characters]) => characters.filter((char) => this.filterBySearchTerm(char.eye_color, term))),
      map((characters) => this.chartService.charactersToGenderByEyeColor(characters)),
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.heightChange.next(event.target.innerHeight / 2.5);
  }

  ngOnInit() {
    this.heightChange.next(window.innerHeight / 2.5);
  }

  searchChanged(term: string): void {
    this.eyeColorSearchChange.next(term);
  }

  filterBySearchTerm(searchedValue: string, searchTerm: string): boolean {
    return searchedValue.toLowerCase().includes(searchTerm.toLowerCase());
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
