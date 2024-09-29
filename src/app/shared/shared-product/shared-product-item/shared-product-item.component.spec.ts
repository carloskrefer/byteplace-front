import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProductItemComponent } from './shared-product-item.component';

describe('SharedProductItemComponent', () => {
  let component: SharedProductItemComponent;
  let fixture: ComponentFixture<SharedProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedProductItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
