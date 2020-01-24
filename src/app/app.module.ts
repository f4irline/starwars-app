import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatProgressSpinnerModule, MatDividerModule } from '@angular/material';
import { GenderChartComponent } from './components/gender-chart/gender-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BmiChartComponent } from './components/bmi-chart/bmi-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GenderChartComponent,
    BmiChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    HttpClientModule,
    NgxChartsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
