import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInventorComponent } from './student-inventor.component';

describe('StudentInventorComponent', () => {
  let component: StudentInventorComponent;
  let fixture: ComponentFixture<StudentInventorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentInventorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInventorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
