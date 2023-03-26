import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { NumericalComponent } from './numerical.component';

@Component({
  selector: "wrapper",
  template: `<app-numerical [title]="titleSubject | async"
                            [min]=" minSubject| async"
                            [max]="maxSubject | async"></app-numerical>`
}) export class TestWrapper {
  public titleSubject: Subject<string> | undefined;
  public minSubject: Subject<number> | undefined;
  public maxSubject: Subject<number> | undefined;
}

describe('NumericalComponent', () => {
  let component: NumericalComponent;
  let fixture: ComponentFixture<TestWrapper>;
  let loader: HarnessLoader;
  let titleSubject: Subject<string>;
  let minSubject: Subject<number>;
  let maxSubject: Subject<number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatInputModule, FormsModule, BrowserAnimationsModule ],
      declarations: [ NumericalComponent, TestWrapper ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWrapper);
    const wrapper = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    titleSubject = new Subject();
    minSubject = new Subject();
    maxSubject = new Subject();

    wrapper.titleSubject = titleSubject;
    wrapper.minSubject = minSubject;
    wrapper.maxSubject = maxSubject;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have an initial value of 0", () => {
    expect(component.value).toEqual(0);
  });

  describe("title", () => {
    it("should be empty when there is no input", () => {
      const title = fixture.debugElement.query(By.css("mat-label")).nativeElement;
      expect(title.textContent).toBe("");
    });

    it("should render correctly if there is an input", () => {
      titleSubject.next("New Title!");
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css("mat-label")).nativeElement;
      expect(title.textContent).toBe("New Title!");
    });
  });

  it("should set min correctly when there is an input", () => {
    minSubject.next(-200);
    fixture.detectChanges();

    expect(component.min).toBe(-200);
  });

  it("should set max correctly when there is an input", () => {
    maxSubject.next(55);
    fixture.detectChanges();
    expect(component.max).toBe(55);
  });

  describe("emitValue", () => {
    it("should emit if value is within the min and max limits", () => {
      minSubject.next(-10);
      maxSubject.next(10);
      fixture.detectChanges();

      const spy = spyOn(component.valueChange$, 'next');
      const input = fixture.debugElement.query(By.css("input")).nativeElement;
      input.value = 8;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledOnceWith(8);
    });

    it("should emit if value equals max", () => {
      minSubject.next(-10);
      maxSubject.next(10);
      fixture.detectChanges();

      const spy = spyOn(component.valueChange$, 'next');
      const input = fixture.debugElement.query(By.css("input")).nativeElement;
      input.value = 10;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledOnceWith(10);
    });

    it("should emit if value equals min", () => {
      minSubject.next(-10);
      maxSubject.next(10);
      fixture.detectChanges();

      const spy = spyOn(component.valueChange$, 'next');
      const input = fixture.debugElement.query(By.css("input")).nativeElement;
      input.value = -10;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledOnceWith(-10);
    });

    it("should not emit if value breaches the max limit", () => {
      minSubject.next(-10);
      maxSubject.next(10);
      fixture.detectChanges();

      const spy = spyOn(component.valueChange$, 'next');
      const input = fixture.debugElement.query(By.css("input")).nativeElement;
      input.value = 80;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it("should not emit if value breaches the min limit", () => {
      minSubject.next(-10);
      maxSubject.next(10);
      fixture.detectChanges();

      const spy = spyOn(component.valueChange$, 'next');
      const input = fixture.debugElement.query(By.css("input")).nativeElement;
      input.value = -11;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it("should not emit if value is null", () => {
      minSubject.next(-10);
      maxSubject.next(10);
      fixture.detectChanges();

      const spy = spyOn(component.valueChange$, 'next');
      const input = fixture.debugElement.query(By.css("input")).nativeElement;
      input.value = null;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });

});
