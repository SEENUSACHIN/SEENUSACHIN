import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantQuizLoginComponent } from './participant-quiz-login.component';

describe('ParticipantQuizLoginComponent', () => {
  let component: ParticipantQuizLoginComponent;
  let fixture: ComponentFixture<ParticipantQuizLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantQuizLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantQuizLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
