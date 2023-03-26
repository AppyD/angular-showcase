import { WeatherRequest } from 'src/app/models/WeatherRequest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';

import { WeatherService } from './../../services/weather.service';
import { ChartModule } from './../chart/chart.module';
import { InputsModule } from './../inputs/inputs.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let weatherService;
  let dataSubject: ReplaySubject<any>;

  beforeEach(async () => {
    weatherService = jasmine.createSpyObj('weatherService', ['getData']);
    dataSubject = new ReplaySubject();
    weatherService.getData.and.callFake(() => dataSubject);

    await TestBed.configureTestingModule({
      imports: [ InputsModule, ChartModule],
      providers: [{provide: WeatherService, useValue: weatherService}],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.dashboard-title')?.textContent).toContain('Weather Dashboard');
  });

  it("should include credit to API", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('Open-Meteo');
  });

  it("should make a data request and transform the response correctly", () => {
    dataSubject.next({
      hourly: {
        time: [1,2,3,4],
        temperature_2m: [10,20,30,40]
      },
      hourly_units: {
        temperature_2m: ["degrees"]
      }
    });

    const onNextSpy = jasmine.createSpy("onNextSpy");
    component.chartModel.subscribe(onNextSpy);
    component.requestData({hourly: "temperature_2m", isLive: true} as WeatherRequest.Request);

    expect(onNextSpy).toHaveBeenCalledOnceWith({
      data: [{x: 1, y: 10}, {x: 2, y: 20}, {x: 3, y: 30}, {x: 4, y: 40}],
      options: {
        seriesName: "Temperature 2m",
        yAxisTitle: "Temperature 2m (degrees)",
        title: "Temperature 2m Today"
      }
    });
  });

  it("should not set anything if there is no response", () => {
    dataSubject.next(undefined);

    const onNextSpy = jasmine.createSpy("onNextSpy");
    component.chartModel.subscribe(onNextSpy);
    component.requestData({hourly: "temperature_2m", isLive: true} as WeatherRequest.Request);

    expect(onNextSpy).not.toHaveBeenCalled();
  });

});
