import { Component, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subject } from 'rxjs';
import { WeatherRequest } from 'src/app/models/WeatherRequest';

import { DropdownChoices } from '../../models/InputModels';
import { WeatherInputs } from '../../models/WeatherInputs';
import { LocationChoices, TimeChoices } from './../../models/InputModels';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent {
  @Output() selections$: Subject<WeatherRequest.Request> = new Subject();

  public variables: DropdownChoices[] = Object.entries(
    WeatherInputs.Labels
  ).map((entry) => {
    return { value: entry[0], label: entry[1] };
  });

  public isLive: boolean = true;
  public useCurrentLocation: boolean = true;

  public currentSelection: any = {
    hourly: undefined,
    latitude: undefined,
    longitude: undefined,
    startDate: undefined,
    endDate: undefined,
    forecastDays: undefined,
  };

  public previousSelection: any;

  /**
   * Methods for changing currentSelection
   */

  setTime(selected: MatButtonToggleChange): void {
    this.isLive = selected.value === TimeChoices.LIVE;
    this.currentSelection.forecastDays = this.isLive ? 1 : undefined;
  }

  setVariable(selectedVariable: string): void {
    this.currentSelection.hourly = selectedVariable as WeatherInputs.Variables;
  }

  setLatitude(latitude: number): void {
    this.currentSelection.latitude = latitude;
  }

  setLongitude(longitude: number): void {
    this.currentSelection.longitude = longitude;
  }

  setStartDate(startDate: Date): void {
    this.currentSelection.startDate = startDate;
  }

  setEndDate(endDate: Date): void {
    this.currentSelection.endDate = endDate;
  }

  setLocation(selected: MatButtonToggleChange): void {
    if (selected.value === LocationChoices.CURRENT) {
      this.useCurrentLocation = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentSelection.latitude = position.coords.latitude;
        this.currentSelection.longitude = position.coords.longitude;
      });
    } else {
      this.useCurrentLocation = false;
      this.currentSelection.latitude = undefined;
      this.currentSelection.longitude = undefined;
    }
  }

  /**
   * Methods for submitting current selection
   */

  submit(): void {
    let request: WeatherRequest.Request = this.isLive
    ? this.buildLiveObject()
    : this.buildHistoricalObject();

    if (this.areInputsValid(request) && !this.sameSelectionAsPrevious()) {
      this.selections$.next(request);
      this.previousSelection = { ...this.currentSelection };
    } else {
      console.error('Did not submit.');
    }
  }

  private areInputsValid(inputs: WeatherRequest.Request) {
    return !Object.values(inputs).some((x) => x === undefined);
  }

  private sameSelectionAsPrevious() {
    return Object.entries(this.currentSelection).every(
      (entry) => this.previousSelection?.[entry[0]] === entry[1]
    );
  }

  private buildLiveObject(): WeatherRequest.Live {
    return {
      isLive: true,
      latitude: this.currentSelection.latitude,
      longitude: this.currentSelection.longitude,
      hourly: this.currentSelection.hourly,
      forecast_days: this.currentSelection.forecastDays,
    };
  }

  private buildHistoricalObject(): WeatherRequest.Historical {
    return {
      isLive: false,
      latitude: this.currentSelection.latitude,
      longitude: this.currentSelection.longitude,
      hourly: this.currentSelection.hourly,
      start_date: this.currentSelection.startDate?.toISOString().slice(0, 10),
      end_date: this.currentSelection.endDate?.toISOString().slice(0, 10),
    }
  }
}
