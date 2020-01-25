import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatProgressSpinnerModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule } from '@angular/material';
import { GenderChartComponent } from './components/gender-chart/gender-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BmiChartComponent } from './components/bmi-chart/bmi-chart.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { LoginComponent } from './components/login/login.component';

function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GenderChartComponent,
    BmiChartComponent,
    CharacterListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    HttpClientModule,
    NgxChartsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:8080'],
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CharacterListComponent]
})
export class AppModule { }
