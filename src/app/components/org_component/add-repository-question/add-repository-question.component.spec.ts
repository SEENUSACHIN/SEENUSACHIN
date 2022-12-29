import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepositoryQuestionComponent } from './add-repository-question.component';

describe('AddRepositoryQuestionComponent', () => {
  let component: AddRepositoryQuestionComponent;
  let fixture: ComponentFixture<AddRepositoryQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRepositoryQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepositoryQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
