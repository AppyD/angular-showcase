export namespace Temperature {

  export interface Response {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    elevation: number;
    hourly_units: {
      time: string;
      temperature_2m: string;
    };
    hourly: {
      time: string[],
      temperature_2m: number[];
    }
  }

  export type ChartData = {x: number, y: number}[]

}


