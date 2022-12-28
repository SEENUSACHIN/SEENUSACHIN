import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRepositoryComponent } from './question-repository.component';

describe('QuestionRepositoryComponent', () => {
  let component: QuestionRepositoryComponent;
  let fixture: ComponentFixture<QuestionRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
