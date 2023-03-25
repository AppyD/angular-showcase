import { WeatherRequest } from 'src/app/models/WeatherRequest';
import { Component, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subject } from 'rxjs';

import { DropdownChoices } from '../../models/InputModels';
import { WeatherInputs } from '../../models/WeatherInputs';
import { LocationChoices, TimeChoices } from './../../models/InputModels';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent {
  @Output() selections: Subject<WeatherRequest.Request> = new Subject();

  public variables: DropdownChoices[] = Object.entries(WeatherInputs.Labels).map(entry => {
    return {value: entry[0], label: entry[1]}
  });

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
      this.inputSelections.hourly = selectedVariable as WeatherInputs.Variables;
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
      this.inputSelections.latitude = undefined;
      this.inputSelections.longitude = undefined;
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
        start_date: this.inputSelections.startDate.toISOString().slice(0,10),
        end_date: this.inputSelections.endDate.toISOString().slice(0,10),
      };
    }

    if(this.areInputsValid(request)){
      this.selections.next(request);
    } else {
      console.error("Could not submit, some values undefined");
    }
  }

  private areInputsValid(inputs: WeatherRequest.Request){
    return !Object.values(inputs).some(x => x === undefined);
  }

}
