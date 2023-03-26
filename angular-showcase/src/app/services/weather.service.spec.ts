import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Data } from '@angular/router';
import { WeatherRequest } from 'src/app/models/WeatherRequest';

import { WeatherService } from './weather.service';
import { WeatherInputs } from '../models/WeatherInputs';

describe('WeatherService', () => {
  let service: WeatherService;
  let http: any;
  let responseSubject: ReplaySubject<any>;

  const mockData = {
    hourly: {
      time: [1,2,3],
      rain: [10,20,30]
    }
  };

  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get']);
    responseSubject = new ReplaySubject(1);
    http.get.and.callFake(() => responseSubject);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient, useValue: http}]
    });

    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getData", () => {
    it("should make a live request if request type is live", () => {
      const spy = spyOn(service, "getLiveData");
      service.getData({isLive: true} as WeatherRequest.Live);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should make a historical request if request type is historical", () => {
      const spy = spyOn(service, "getHistoricalData");
      service.getData({isLive: false} as WeatherRequest.Historical);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getLiveData", () => {

    it("should make a get request to the LIVE url with the correct params", () => {
      const liveRequest: WeatherRequest.Live = {
        isLive: true,
        forecast_days: 1,
        hourly: WeatherInputs.Variables.RAIN,
        longitude: 10,
        latitude: 10,
      };

      responseSubject.next(mockData);
      service.getLiveData(liveRequest);

      expect(http.get).toHaveBeenCalledOnceWith("https://api.open-meteo.com/v1/forecast?forecast_days=1&hourly=rain&longitude=10&latitude=10");
    });

  });

  describe("getHistoricalData", () => {

    it("should make a get request to the HISTORICAL url with the correct params", () => {
      const histRequest: WeatherRequest.Historical = {
        isLive: false,
        start_date: "2023-02-02",
        end_date: "2023-03-02",
        hourly: WeatherInputs.Variables.RAIN,
        longitude: 10,
        latitude: 10,
      };

      responseSubject.next(mockData);
      service.getHistoricalData(histRequest);

      expect(http.get).toHaveBeenCalledOnceWith("https://archive-api.open-meteo.com/v1/archive?start_date=2023-02-02&end_date=2023-03-02&hourly=rain&longitude=10&latitude=10");
    });

  });
});
