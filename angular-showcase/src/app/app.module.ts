import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { InputsModule } from './components/inputs/inputs.module';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DashboardModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
