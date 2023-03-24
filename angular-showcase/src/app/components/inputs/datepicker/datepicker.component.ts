import { Component, Input, Output } from '@angular/core';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {

  // TODO date range validation injectable
  // @Input() min: Date = new Date("2022-01-01");
  // @Input() max: Date = new Date();

  @Output() startDate: Subject<Date> = new Subject();
  @Output() endDate: Subject<Date> = new Subject();

  // MatDatepickerInputEvent<any, DateRange<any>>
  changeStart(selection: MatDatepickerInputEvent<any, DateRange<any>>){
    this.startDate.next(selection.value);
  }

  changeEnd(selection: MatDatepickerInputEvent<any, DateRange<any>>){
    this.endDate.next(selection.value);
  }

}
