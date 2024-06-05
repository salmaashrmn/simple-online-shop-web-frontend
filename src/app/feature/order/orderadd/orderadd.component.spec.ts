import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderaddComponent } from './orderadd.component';

describe('OrderaddComponent', () => {
  let component: OrderaddComponent;
  let fixture: ComponentFixture<OrderaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
