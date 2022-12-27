import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantGameComponent } from './participant-game.component';

describe('ParticipantGameComponent', () => {
  let component: ParticipantGameComponent;
  let fixture: ComponentFixture<ParticipantGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
