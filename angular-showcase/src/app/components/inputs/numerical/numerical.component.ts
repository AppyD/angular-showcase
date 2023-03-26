import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html'
})
export class NumericalComponent {

  @Input() public title: string = "";
  @Input() public min: number = -180;
  @Input() public max: number = 180;

  @Output() valueChange$: Subject<number> = new Subject();

  public value = 0;

  ngOnInit(){
    this.emitValue(this.value);
  }

  emitValue(value: number){
    if(value !== null && value <= this.max && value >= this.min){
      this.valueChange$.next(value);
    }
  }

}
