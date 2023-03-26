import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectHarness } from '@angular/material/select/testing';
import { DropdownComponent } from './dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { DropdownChoices } from 'src/app/models/InputModels';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'wrapper',
  template: '<app-dropdown [choices]="choices|async" [title]="title|async"></app-dropdown>'
}) export class TestWrapper {
  public title: Subject<string> | undefined;
  public choices: Subject<DropdownChoices[]> | undefined;
}

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<TestWrapper>;
  let loader: HarnessLoader;

  let titleSubject: Subject<string>;
  let choicesSubject: Subject<DropdownChoices[]>;

  beforeEach(async () => {
    titleSubject = new Subject();
    choicesSubject = new Subject();

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      declarations: [ DropdownComponent, TestWrapper ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWrapper);
    const wrapper = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    wrapper.choices = choicesSubject;
    wrapper.title = titleSubject;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have nothing selected by default", async () => {
    const dropdown = await loader.getHarness(MatSelectHarness);
    expect(await dropdown.isEmpty()).toBeTrue();
  });

  it("should emit the dropdown selection change", async () => {
    const choices = [{value: "a", label: "Option A"}, {value: "b", label: "Option B"}];
    choicesSubject.next(choices);
    fixture.detectChanges();

    const spy = spyOn(component.selection$, 'next');
    const dropdown = await loader.getHarness(MatSelectHarness);
    await dropdown.open();
    const options = await dropdown.getOptions();
    await options[1].click();
    expect(spy).toHaveBeenCalledOnceWith("a");
  });

  it("should render the title correctly", () => {
    titleSubject.next("New Title!");
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css("mat-label")).nativeElement;
    expect(title.textContent).toBe("New Title!");
  });

  it("should have a dropdown with only the None category if no choices are input", async () => {
    const dropdown = await loader.getHarness(MatSelectHarness);
    await dropdown.open();
    const options = await dropdown.getOptions();
    expect(options).toHaveSize(1);
    expect(await options[0].getText()).toEqual("None");
  });

  it("should have an empty title if no title is input", async () => {
    const title = fixture.debugElement.query(By.css("mat-label")).nativeElement;
    expect(title.textContent).toBe("");
  });

});
