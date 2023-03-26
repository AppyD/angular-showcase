import { MatDatepickerInputHarness, MatEndDateHarness, MatStartDateHarness } from '@angular/material/datepicker/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDatepickerModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatNativeDateModule,
        MatFormFieldModule,
      ],
      declarations: [ DatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a min start date of 1 January 2023", async () => {
    const startDate = await loader.getHarness(MatStartDateHarness);
    expect(await startDate.getMin()).toEqual("2023-01-01");
  });

  it("should have a max start date of today", async () => {
    const startDate = await loader.getHarness(MatStartDateHarness);
    expect(await startDate.getMax()).toEqual(new Date().toISOString().substring(0,10));
  });

  it("should have a min end date of 1 January 2023", async () => {
    const endDate = await loader.getHarness(MatEndDateHarness);
    expect(await endDate.getMin()).toEqual("2023-01-01");
  });

  it("should have a max end date of today", async () => {
    const endDate = await loader.getHarness(MatEndDateHarness);
    expect(await endDate.getMax()).toEqual(new Date().toISOString().substring(0,10));
  });

  it("should emit start date when start is changed", async () => {
    const spy = spyOn(component.startDate, "next");
    const startDate = await loader.getHarness(MatStartDateHarness);
    await startDate.setValue("2023-02-02");
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnceWith(new Date("2023-02-02"));
  });

  it("should emit end date when end is changed", async () => {
    const spy = spyOn(component.endDate, "next");
    const endDate = await loader.getHarness(MatEndDateHarness);
    await endDate.setValue("2023-03-02");
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnceWith(new Date("2023-03-02"));
  });
});
