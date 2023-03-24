import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { WeatherRequest } from '../models/WeatherRequest';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public static LIVE_URL: string = "https://api.open-meteo.com/v1/forecast";
  public static HISTORICAL_URL: string = "https://archive-api.open-meteo.com/v1/archive";

  constructor(public http: HttpClient) {
  }

  public getLiveData(params: WeatherRequest.Live){
    return this.get(WeatherService.LIVE_URL, params);
  }

  public getHistoricalData(params: WeatherRequest.Historical){
    return this.get(WeatherService.HISTORICAL_URL, params);
  }

  public getData(request: WeatherRequest.Request): Observable<any>{
    return WeatherRequest.isLive(request)
      ? this.getLiveData(request)
      : this.getHistoricalData(request);
  }

  private get(url: string, params: WeatherRequest.Request){
    const urlParams: URLSearchParams = this.getParams(params);
    return this.http.get(`${url}?${urlParams.toString()}`)
    .pipe(
      catchError((err) => {
        console.error("Error fetching data", url, JSON.stringify(params));
        return of(undefined);
      })
    );
  }

  private getParams(params: WeatherRequest.Request): URLSearchParams {
    const urlParams: URLSearchParams = new URLSearchParams();
    Object.entries(params).forEach(entry => {
      if(entry[0] !== "isLive"){
        urlParams.set(entry[0], entry[1].toString());
      }
    })
    return urlParams;
  }

}
