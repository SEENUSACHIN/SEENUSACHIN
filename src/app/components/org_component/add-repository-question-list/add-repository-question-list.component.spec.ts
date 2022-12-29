import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepositoryQuestionListComponent } from './add-repository-question-list.component';

describe('AddRepositoryQuestionListComponent', () => {
  let component: AddRepositoryQuestionListComponent;
  let fixture: ComponentFixture<AddRepositoryQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRepositoryQuestionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepositoryQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
