import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WeatherRequest } from '../../models/WeatherRequest';

@Component({
  selector: 'app-past-requests',
  templateUrl: './past-requests.component.html',
  styleUrls: ['./past-requests.component.scss']
})
export class PastRequestsComponent {

  @Input() public pastRequests: WeatherRequest.Request[] = [];

  public filterCriteria: string = "";

  trackByFn(index: number, element: WeatherRequest.Request){
    return index;
  }

}
