import { Component, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from '../../models/Chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent {

  @Input() public data: Chart.Model | null;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  updateFlag: boolean = false;


  constructor(){
    this.data = {
      data: [],
      options: {
        seriesName: "Weather Data",
        yAxisTitle: "",
        title: ""
      }
    };

    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: this.data.options.title
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: "Time"
        }
      },
      series: [{
        type: 'line',
        data: this.data.data,
        name: this.data.options.seriesName
      }]
    };
  }

  ngOnChanges(changes: SimpleChanges){
    if(!!this.chartOptions){
      let seriesObj: Highcharts.SeriesOptionsType = {
        type: 'line',
        data: [],
        name: ""
      };

      let yAxisObj = {
        title: {
          text: ""
        }
      };

      let titleObj = {
        text: ""
      };

      if (changes?.['data']?.currentValue && !changes['data'].isFirstChange()) {
        seriesObj.data = changes['data'].currentValue.data;
        seriesObj.name = changes['data'].currentValue.options.seriesName;
        yAxisObj.title.text = changes['data'].currentValue.options.yAxisTitle;
        titleObj.text = changes['data'].currentValue.options.title;
      }

      this.chartOptions = {...this.chartOptions, series: [seriesObj], yAxis: yAxisObj, title: titleObj};
      this.updateFlag = true;
    }
  }

}
