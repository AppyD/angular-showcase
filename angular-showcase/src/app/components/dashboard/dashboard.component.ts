import { WeatherInputs } from './../../models/WeatherInputs';
import { WeatherRequest } from '../../models/WeatherRequest';
import { WeatherService } from './../../services/weather.service';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Response } from '../../models/Response';
import { Chart } from '../../models/Chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public chartModel$: Subject<Chart.Model> = new Subject();
  public pastRequests: WeatherRequest.Request[] = [];

  constructor(public weatherService: WeatherService){
  }

  requestData(request: WeatherRequest.Request){
    this.weatherService.getData(request)
    .pipe(
      take(1)
    ).subscribe(response => {
      if(response){
        const label: string = WeatherInputs.Labels[request.hourly];
        const model = {
          data: this.transformData(response, request.hourly),
          options: {
            seriesName: label,
            yAxisTitle: `${label} (${response.hourly_units[request.hourly]})`,
            title: `${label} (${request.isLive ? 'Today' : request.start_date + ' to ' + request.end_date})`,
          },
        };
        this.chartModel$.next(model);
        this.pastRequests.push(request);
      }
    });
  }

  transformData(data: Response.Data, field: string): Chart.Data {
    return data.hourly.time.map((date: string, index: number) => {
      return {
        x: new Date(date).getTime(),
        y: data.hourly[field][index]
      }
    })
  }

}
