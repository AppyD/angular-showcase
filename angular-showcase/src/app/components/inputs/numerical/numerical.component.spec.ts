import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalComponent } from './numerical.component';

describe('NumericalComponent', () => {
  let component: NumericalComponent;
  let fixture: ComponentFixture<NumericalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
