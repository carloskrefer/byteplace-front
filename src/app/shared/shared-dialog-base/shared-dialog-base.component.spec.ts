import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDialogBaseComponent } from './shared-dialog-base.component';

describe('SharedDialogBaseComponent', () => {
  let component: SharedDialogBaseComponent;
  let fixture: ComponentFixture<SharedDialogBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDialogBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDialogBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
