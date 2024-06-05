import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemaddComponent } from './itemadd.component';

describe('ItemaddComponent', () => {
  let component: ItemaddComponent;
  let fixture: ComponentFixture<ItemaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
