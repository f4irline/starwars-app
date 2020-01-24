import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MatDividerModule } from '@angular/material/divider';
import { GenderChartComponent } from './components/gender-chart/gender-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BmiChartComponent } from './components/bmi-chart/bmi-chart.component';
import { MathService } from './services/math/math.service';

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
    NoopAnimationsModule,
    MatDividerModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [
    MathService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
