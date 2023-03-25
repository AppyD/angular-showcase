export namespace Chart {

  export type Data = {x: number, y: number}[];

  export interface Options {
    seriesName: string;
    yAxisTitle: string;
    title: string;
  }

  export interface Model {
    data: Data;
    options: Options;
  }

}
