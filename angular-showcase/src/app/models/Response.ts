export namespace Response {

  interface HourlyData {
    time: string[]
  }

  export interface Data {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    elevation: number;
    hourly_units: {
      time: string;
      [key: string]: string;
    };
    hourly: HourlyData & {
      [key: string]: number[];
    }
  }

}


