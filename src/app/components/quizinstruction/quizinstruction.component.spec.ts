import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizinstructionComponent } from './quizinstruction.component';

describe('QuizinstructionComponent', () => {
  let component: QuizinstructionComponent;
  let fixture: ComponentFixture<QuizinstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizinstructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizinstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
