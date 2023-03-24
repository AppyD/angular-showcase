import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html',
  styleUrls: ['./numerical.component.scss']
})
export class NumericalComponent {

  @Input() public title: string = "";
  @Input() value: number = 0;

  @Output() valueChange$: Subject<number> = new Subject();

  emitValue(value: number){
    this.valueChange$.next(value);
  }

}
