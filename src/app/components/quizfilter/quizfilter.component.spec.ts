import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizfilterComponent } from './quizfilter.component';

describe('QuizfilterComponent', () => {
  let component: QuizfilterComponent;
  let fixture: ComponentFixture<QuizfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizfilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
