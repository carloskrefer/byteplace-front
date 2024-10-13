import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormFieldBaseComponent } from './shared-form-field-base.component';

describe('SharedFormFieldBaseComponent', () => {
  let component: SharedFormFieldBaseComponent;
  let fixture: ComponentFixture<SharedFormFieldBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFormFieldBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFormFieldBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
