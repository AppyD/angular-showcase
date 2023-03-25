import { WeatherInputs } from "./WeatherInputs";

export namespace WeatherRequest {

  export interface BaseRequest {
    latitude: number;
    longitude: number;
    hourly: WeatherInputs.Variables;
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
