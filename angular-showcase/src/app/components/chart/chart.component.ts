import { Component, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Temperature } from 'src/app/models/Temperature';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  @Input() public data: Temperature.ChartData = [];
  @Input() public title: string = "";

  public chart!: Highcharts.Chart;

  ngOnChanges(changes: SimpleChanges){
    if(this.chart){
      if (changes?.['data']?.currentValue && !changes['data'].isFirstChange()) {
        this.chart.series[0].setData(this.data, false);
      }

      if (changes?.['title']?.currentValue && !changes['title'].isFirstChange()) {
        this.chart.setTitle({ text: this.title }, undefined, false);
      }

      this.chart.redraw(true);
    }
  }

  ngOnInit(){
    this.chart = Highcharts.chart('chart-container', {
      chart: {
        type: 'line',
      },
      title: {
        text: this.title
      },
      xAxis: {
        type: 'datetime',
      },
      series: [{
        name: this.title,
        type: 'line',
        data: this.data
      }]
    });
  }

  ngOnDestroy(){
    this.chart.destroy();
  }

}
