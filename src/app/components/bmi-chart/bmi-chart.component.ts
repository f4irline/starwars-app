import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChartService, SeriesData } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrls: ['./bmi-chart.component.scss']
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
    private apiService: ApiService,
    private chartService: ChartService,
  ) {
    this.heightChange = new BehaviorSubject<number>(0);
    this.height$ = this.heightChange.asObservable();

    this.data$ = this.apiService.getCharacters(5).pipe(
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
