import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { PastRequestsComponent } from "./past-requests.component";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [PastRequestsComponent, FilterPipe],
  imports: [CommonModule, MatInputModule, FormsModule, BrowserAnimationsModule],
  exports: [PastRequestsComponent]
})
export class PastRequestsModule { }
