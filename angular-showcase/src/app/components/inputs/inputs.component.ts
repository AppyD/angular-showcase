import { WeatherRequest } from 'src/app/models/WeatherRequest';
import { Component, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subject } from 'rxjs';

import { DropdownChoices } from '../../models/InputModels';
import { WeatherData } from '../../models/WeatherData';
import { LocationChoices, TimeChoices } from './../../models/InputModels';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent {
  @Output() selections: Subject<WeatherRequest.Request> = new Subject();

  public variables: DropdownChoices[] = [
    { value: WeatherData.Variables.TEMPERATURE, label: 'Temperature 2m' },
    { value: WeatherData.Variables.WINDSPEED, label: 'Wind Speed 10m' },
    { value: WeatherData.Variables.RAIN, label: 'Rain' },
    { value: WeatherData.Variables.SNOWFALL, label: 'Snowfall' },
  ];

  public isLive: boolean = true;
  public useCurrentLocation: boolean = true;

  public inputSelections: any = {
    hourly: undefined,
    latitude: undefined,
    longitude: undefined,
    startDate: undefined,
    endDate: undefined,
    forecastDays: undefined
  };

  setTime(selected: MatButtonToggleChange): void {
    this.isLive = selected.value === TimeChoices.LIVE;
    if (this.isLive) {
      this.inputSelections.forecastDays = 1;
    }
  }

  setVariable(selectedVariable: string): void {
    if (selectedVariable) {
      this.inputSelections.hourly = selectedVariable as WeatherData.Variables;
    }
  }

  setLatitude(latitude: number): void {
    this.inputSelections.latitude = latitude;
  }

  setLongitude(longitude: number): void {
    this.inputSelections.longitude = longitude;
  }

  setStartDate(startDate: Date): void {
    this.inputSelections.startDate = startDate;
  }

  setEndDate(endDate: Date): void {
    this.inputSelections.endDate = endDate;
  }

  setLocation(selected: MatButtonToggleChange): void {
    if(selected.value === LocationChoices.CURRENT){
      this.useCurrentLocation = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.inputSelections.latitude = position.coords.latitude;
        this.inputSelections.longitude = position.coords.longitude;
      });
    } else {
      this.useCurrentLocation = false;
    }
  }

  onSubmit(): void {
    let request: WeatherRequest.Request;

    if(this.isLive){
      request = {
        isLive: true,
        latitude: this.inputSelections.latitude,
        longitude: this.inputSelections.longitude,
        hourly: this.inputSelections.hourly,
        forecast_days: this.inputSelections.forecastDays
      };
    } else {
      request = {
        isLive: false,
        latitude: this.inputSelections.latitude,
        longitude: this.inputSelections.longitude,
        hourly: this.inputSelections.hourly,
        start_date: this.inputSelections.startDate,
        end_date: this.inputSelections.endDate,
      };
    }

    if(this.areInputsValid(request)){
      this.selections.next(request);
    } else {
      console.error("Could not submit, some values undefined");
    }
  }

  private areInputsValid(inputs: WeatherRequest.Request){
    return !Object.values(inputs).some(x => !x);
  }

}
