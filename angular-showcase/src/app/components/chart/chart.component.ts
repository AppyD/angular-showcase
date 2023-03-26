import { Component, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from '../../models/Chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  @Input() public model: Chart.Model | null;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  updateFlag: boolean = false;

  constructor() {
    this.model = {
      data: [],
      options: {
        seriesName: 'Weather Data',
        yAxisTitle: '',
        title: '',
      },
    };

    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: this.model.options.title,
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time',
        },
      },
      series: [
        {
          type: 'line',
          data: this.model.data,
          name: this.model.options.seriesName,
        },
      ],
    };
  }

  private hasChanged(changes: SimpleChanges): boolean {
    return this.chartOptions && changes?.['model']?.currentValue && !changes['model'].isFirstChange()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.hasChanged(changes)) {
      const model = changes['model'].currentValue;

      let seriesObj: Highcharts.SeriesOptionsType = {
        type: 'line',
        data: model.data,
        name:  model.options.seriesName,
      };

      let yAxisObj: Highcharts.YAxisOptions = {
        title: {
          text: model.options.yAxisTitle,
        },
      };

      let titleObj: Highcharts.TitleOptions = {
        text: model.options.title,
      };

      this.chartOptions = {
        ...this.chartOptions,
        series: [seriesObj],
        yAxis: yAxisObj,
        title: titleObj,
      };
      this.updateFlag = true;
    }
  }
}
