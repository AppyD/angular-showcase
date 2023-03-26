import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';

import { ChartComponent } from './../chart/chart.component';

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [ChartComponent]
})
export class ChartModule { }
