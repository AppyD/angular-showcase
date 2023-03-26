import { MatInputHarness } from '@angular/material/input/testing';
import { FormsModule } from '@angular/forms';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputsComponent } from './inputs.component';
import { NumericalComponent } from './numerical/numerical.component';
import { MatSelectHarness } from '@angular/material/select/testing';
import { WeatherInputs } from '../../models/WeatherInputs';
import { MatStartDateHarness } from '@angular/material/datepicker/testing';

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule
      ],
      declarations: [
        InputsComponent,
        DropdownComponent,
        DatepickerComponent,
        NumericalComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("defaults", () => {
    it("should have isLive set to true", () => {
      expect(component.isLive).toBe(true);
    });

    it("should have useCurrentLocation set to true", () => {
      expect(component.useCurrentLocation).toBe(true);
    });

    it("should set up the dropdown variables correctly", () => {
      expect(component.variables).toEqual([
        {value: "temperature_2m", label: "Temperature 2m"},
        {value: "windspeed_10m", label: "Wind speed 10m"},
        {value: "rain", label: "Rain"},
        {value: "snowfall", label: "Snowfall"},
      ]);
    });

    it("should have undefined selections for currentSelection", () => {
      expect(Object.values(component.currentSelection).every(x => x === undefined)).toBe(true);
    });
  });

  describe("setTime", () => {

    it("should set isLive to true if live is selected", async () => {
      const input = await loader.getHarness(MatButtonToggleHarness.with({text: "Live"}));
      await input.check();
      fixture.detectChanges();

      expect(component.isLive).toBe(true);
    });

    it("should set forecastDays to 1 if live is selected", async () => {
      const input = await loader.getHarness(MatButtonToggleHarness.with({text: "Live"}));
      await input.check();
      fixture.detectChanges();

      expect(component.currentSelection.forecastDays).toBe(1);
    });

    it("should set isLive to false if historical is selected", async () => {
      const input = await loader.getHarness(MatButtonToggleHarness.with({text: "Historical"}));
      await input.check();
      fixture.detectChanges();

      expect(component.isLive).toBe(false);
    });

    it("should set forecastDays to undefined if historical is selected", async () => {
      const input = await loader.getHarness(MatButtonToggleHarness.with({text: "Historical"}));
      await input.check();
      fixture.detectChanges();

      expect(component.currentSelection.forecastDays).toBeUndefined();
    });

  });

  describe("currentSelection ", () => {

    it("should set hourly", async () => {
      component.setVariable("temperature_2m");
      expect(component.currentSelection.hourly).toEqual(WeatherInputs.Variables.TEMPERATURE);
    });

    it("should set latitude", async () => {
      component.setLatitude(10.02);
      expect(component.currentSelection.latitude).toEqual(10.02);
    });

    it("should set longitude", async () => {
      component.setLongitude(-22);
      expect(component.currentSelection.longitude).toEqual(-22);
    });

    it("should set start date", async () => {
      component.setStartDate(new Date("2023-02-02"));
      expect(component.currentSelection.startDate).toEqual(new Date("2023-02-02"));
    });

    it("should set end date", async () => {
      component.setEndDate(new Date("2023-12-02"));
      expect(component.currentSelection.endDate).toEqual(new Date("2023-12-02"));
    });

  });

  describe("onSubmit", () => {

    it("should emit a live request inputs are valid for live", () => {
      component.isLive = true;
      component.currentSelection = {
        latitude: 10,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        forecastDays: 1,
      };
      component.previousSelection = undefined;

      fixture.detectChanges();

      const spy = spyOn(component.selections$, "next");
      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledOnceWith({
        latitude: 10,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        forecast_days: 1,
        isLive: true,
      });
    });

    it("should emit a historical request inputs are valid for historical", () => {
      component.isLive = false;
      component.currentSelection = {
        latitude: 10,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        startDate: new Date("2023-02-02"),
        endDate: new Date("2023-03-02")
      };
      component.previousSelection = undefined;

      fixture.detectChanges();

      const spy = spyOn(component.selections$, "next");
      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledOnceWith({
        latitude: 10,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        start_date: "2023-02-02",
        end_date: "2023-03-02",
        isLive: false
      });
    });

    it("should not emit if a live request is missing some fields", () => {
      component.isLive = true;
      component.currentSelection = {
        latitude: undefined,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        forecastDays: 1,
      };
      component.previousSelection = undefined;

      fixture.detectChanges();

      const spy = spyOn(component.selections$, "next");
      component.submit();

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it("should not emit if a historical request is missing some fields", () => {
      component.isLive = false;
      component.currentSelection = {
        latitude: 10,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        startDate: undefined,
        endDate: new Date("2023-03-02")
      };
      component.previousSelection = undefined;

      fixture.detectChanges();

      const spy = spyOn(component.selections$, "next");
      component.submit();

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it("should not emit if the parameters have not changed", () => {
      component.isLive = true;
      component.currentSelection = {
        latitude: 10,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        forecastDays: 1,
      };
      component.previousSelection = undefined;

      fixture.detectChanges();

      const spy = spyOn(component.selections$, "next");
      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      spy.calls.reset();

      component.submit();
      expect(spy).not.toHaveBeenCalled();
    });

    it("should emit if the parameters have changed", () => {
      component.isLive = true;
      component.currentSelection = {
        latitude: 10,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        forecastDays: 1,
      };
      component.previousSelection = undefined;

      fixture.detectChanges();

      const spy = spyOn(component.selections$, "next");
      component.submit();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      spy.calls.reset();

      component.submit();
      component.currentSelection = {
        latitude: 12,
        longitude: 12,
        hourly: WeatherInputs.Variables.RAIN,
        forecastDays: 1,
      };
      expect(spy).not.toHaveBeenCalledTimes(1);
    });

  });

});
