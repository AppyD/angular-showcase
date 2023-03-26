import { Component, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';

import { DropdownChoices } from '../../../models/InputModels';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent {

  @Input() public choices: DropdownChoices[] = [];
  @Input() public title: string = "";

  @Output() public selection$: Subject<string> = new Subject();

  emitChange(selection: MatSelectChange){
    this.selection$.next(selection.value);
  }

}
