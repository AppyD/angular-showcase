import { ChartModule } from './../chart/chart.module';
import { InputsModule } from './../inputs/inputs.module';
import { WeatherService } from './../../services/weather.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let weatherService: WeatherService;

  beforeEach(async () => {
    weatherService = jasmine.createSpyObj('weatherService', ['getData']);

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
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.dashboard-title')?.textContent).toContain('Weather Dashboard');
  });
});
