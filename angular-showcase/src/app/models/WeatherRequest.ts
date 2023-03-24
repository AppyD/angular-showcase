import { WeatherData } from "./WeatherData";

export namespace WeatherRequest {

  export interface BaseRequest {
    latitude: number;
    longitude: number;
    hourly: WeatherData.Variables;
  }

  export interface Live extends BaseRequest {
    isLive: true;
    forecast_days: number;
  }

  export interface Historical extends BaseRequest {
    isLive: false
    start_date: string;
    end_date: string;
  }

  export type Request = Historical | Live;

  export function isLive(request: Request): request is Live {
    return request.isLive;
  }

}
