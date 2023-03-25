import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { InputsModule } from './components/inputs/inputs.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputsModule,
    HighchartsChartModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
