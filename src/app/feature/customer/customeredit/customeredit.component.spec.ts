import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomereditComponent } from './customeredit.component';

describe('CustomereditComponent', () => {
  let component: CustomereditComponent;
  let fixture: ComponentFixture<CustomereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomereditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
