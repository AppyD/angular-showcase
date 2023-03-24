import { NumberValueAccessor } from "@angular/forms";

export namespace WeatherData {

  export enum Variables {
    TEMPERATURE = "temperature_2m",
    WINDSPEED = "windspeed_10m",
    RAIN = "rain",
    SNOWFALL = "snowfall"
  }

  export const DATE_RANGE = {
    min: "2022-01-01",
  }

}
