import { WeatherRequest } from '../../models/WeatherRequest';
import { WeatherService } from './../../services/weather.service';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Temperature } from '../../models/Temperature';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public data: Subject<any> = new Subject();

  constructor(public weatherService: WeatherService){
  }

  requestData(request: WeatherRequest.Request){
    this.weatherService.getData(request)
    .pipe(
      take(1)
    ).subscribe(response => this.data.next(this.transformData(response)));
  }

  transformData(data: Temperature.Response): Temperature.ChartData {
    return data.hourly.time.map((date: string, index: number) => {
      return {
        x: new Date(date).getTime(),
        y: data.hourly.temperature_2m[index]
      }
    })
  }

}
