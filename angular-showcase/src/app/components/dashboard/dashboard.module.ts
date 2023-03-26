import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartModule } from '../chart/chart.module';
import { PastRequestsModule } from '../past-requests/past-requests.module';
import { InputsModule } from './../inputs/inputs.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    InputsModule,
    ChartModule,
    PastRequestsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
