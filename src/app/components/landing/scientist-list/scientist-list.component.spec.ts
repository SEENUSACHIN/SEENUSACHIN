import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientistListComponent } from './scientist-list.component';

describe('ScientistListComponent', () => {
  let component: ScientistListComponent;
  let fixture: ComponentFixture<ScientistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientistListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScientistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
