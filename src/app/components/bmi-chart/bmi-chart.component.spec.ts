import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiChartComponent } from './bmi-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartService, SeriesData } from 'src/app/services/chart/chart.service';

describe('BmiChartComponent', () => {
    let component: BmiChartComponent;
    let fixture: ComponentFixture<BmiChartComponent>;
    let chartService: ChartService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BmiChartComponent],
            imports: [
                NgxChartsModule,
                MatDialogModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BmiChartComponent);
        chartService = fixture.debugElement.injector.get(ChartService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initially not have data', (done: DoneFn) => {
        component.data$.subscribe(data => {
            expect(data.length).toBe(0);
            done();
        });
    });

    it('should have some data', (done: DoneFn) => {
        spyOn(chartService, 'charactersToBmiData').and.returnValue([
            {
                name: 'Normal',
            },
        ] as SeriesData[]);

        component.data$.subscribe(data => {
            expect(data.length).toBeGreaterThan(0);
            done();
        });
    });
});
