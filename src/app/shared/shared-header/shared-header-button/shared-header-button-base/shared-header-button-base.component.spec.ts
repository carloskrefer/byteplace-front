import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHeaderButtonBaseComponent } from './shared-header-button-base.component';

describe('SharedHeaderButtonBaseComponent', () => {
  let component: SharedHeaderButtonBaseComponent;
  let fixture: ComponentFixture<SharedHeaderButtonBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedHeaderButtonBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedHeaderButtonBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
