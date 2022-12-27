import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantGameListComponent } from './participant-game-list.component';

describe('ParticipantGameListComponent', () => {
  let component: ParticipantGameListComponent;
  let fixture: ComponentFixture<ParticipantGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantGameListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
