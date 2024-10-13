import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormFieldEmailComponent } from './shared-form-field-email.component';

describe('SharedFormFieldEmailComponent', () => {
  let component: SharedFormFieldEmailComponent;
  let fixture: ComponentFixture<SharedFormFieldEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFormFieldEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFormFieldEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
