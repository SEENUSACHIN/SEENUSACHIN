import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsInventoryComponent } from './kids-inventory.component';

describe('KidsInventoryComponent', () => {
  let component: KidsInventoryComponent;
  let fixture: ComponentFixture<KidsInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidsInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
