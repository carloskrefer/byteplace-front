import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormFieldPasswordComponent } from './shared-form-field-password.component';

describe('SharedFormFieldPasswordComponent', () => {
  let component: SharedFormFieldPasswordComponent;
  let fixture: ComponentFixture<SharedFormFieldPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFormFieldPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFormFieldPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
