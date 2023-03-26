import { WeatherRequest } from 'src/app/models/WeatherRequest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { PastRequestsComponent } from './past-requests.component';
import { Component } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { WeatherInputs } from '../../models/WeatherInputs';
import { By } from '@angular/platform-browser';

@Component({
  selector: "wrapper",
  template: `<app-past-requests [pastRequests]="requests | async"></app-past-requests>`
}) export class TestWrapper {
  requests: Subject<WeatherRequest.Request[]> | undefined;
}

describe('PastRequestsComponent', () => {
  let component: PastRequestsComponent;
  let fixture: ComponentFixture<TestWrapper>;
  let requestsSubject: Subject<WeatherRequest.Request[]>;

  beforeEach(async () => {
    requestsSubject = new Subject();

    await TestBed.configureTestingModule({
      imports: [MatInputModule, FormsModule, BrowserAnimationsModule],
      declarations: [ PastRequestsComponent, FilterPipe, TestWrapper ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWrapper);
    const wrapper = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    wrapper.requests = requestsSubject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have an empty filter by default", () => {
    expect(component.filterCriteria).toEqual("");
  });

  it("should have a row for each of the past requests", async () => {
    requestsSubject.next([
      {isLive: true, forecast_days: 1, hourly: WeatherInputs.Variables.RAIN, longitude: 10, latitude: 10},
      {isLive: true, forecast_days: 1, hourly: WeatherInputs.Variables.TEMPERATURE, longitude: 10, latitude: 10},
      {isLive: false, start_date: "2022-02-02", end_date: "2022-05-05", hourly: WeatherInputs.Variables.RAIN, longitude: 10, latitude: 10},
      {isLive: false, start_date: "2022-03-02", end_date: "2022-05-05", hourly: WeatherInputs.Variables.RAIN, longitude: 40, latitude: -10}
    ]);
    fixture.detectChanges();

    expect(component.pastRequests.length).toBe(4);
    const tableRows = fixture.debugElement.queryAll(By.css("tr"));
    expect(tableRows.length).toBe(5); // 1 extra for the header
  });

  it("should filter rows according to the filter criteria", async () => {
    requestsSubject.next([
      {isLive: true, forecast_days: 1, hourly: WeatherInputs.Variables.RAIN, longitude: 10, latitude: 10},
      {isLive: true, forecast_days: 1, hourly: WeatherInputs.Variables.TEMPERATURE, longitude: 10, latitude: 10},
      {isLive: false, start_date: "2022-02-02", end_date: "2022-05-05", hourly: WeatherInputs.Variables.RAIN, longitude: 10, latitude: 10},
      {isLive: false, start_date: "2022-03-02", end_date: "2022-05-05", hourly: WeatherInputs.Variables.RAIN, longitude: 40, latitude: -10}
    ]);
    component.filterCriteria = "rain";
    fixture.detectChanges();

    expect(component.pastRequests.length).toBe(4);
    const tableRows = fixture.debugElement.queryAll(By.css("tr"));
    expect(tableRows.length).toBe(4);
  });
});
