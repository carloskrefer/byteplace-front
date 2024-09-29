import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHeaderButtonComponent } from './shared-header-button.component';

describe('SharedHeaderButtonComponent', () => {
  let component: SharedHeaderButtonComponent;
  let fixture: ComponentFixture<SharedHeaderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedHeaderButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedHeaderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
