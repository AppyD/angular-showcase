export namespace WeatherInputs {

  export enum Variables {
    TEMPERATURE = "temperature_2m",
    WINDSPEED = "windspeed_10m",
    RAIN = "rain",
    SNOWFALL = "snowfall"
  }

  export const Labels = {
    [Variables.TEMPERATURE]: "Temperature 2m",
    [Variables.WINDSPEED]: "Wind speed 10m",
    [Variables.RAIN]: "Rain",
    [Variables.SNOWFALL]: "Snowfall",
  }

  export const DATE_RANGE = {
    min: "2022-01-01",
  }

}
