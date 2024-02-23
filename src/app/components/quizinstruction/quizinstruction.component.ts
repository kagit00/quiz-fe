import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-quizinstruction',
  templateUrl: './quizinstruction.component.html',
  styleUrl: './quizinstruction.component.css'
})
export class QuizinstructionComponent {
  quiz: any = {}
  eachQuestionMark: number = (+this.quiz.maxMarks)/(+this.quiz.numberOfQuestions)
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuizinstructionComponent>,
    private logInService: LoginService
  ) { 
    this.quiz = {...data}
  }
  ngOnInit() {
    this.eachQuestionMark = (+this.quiz.maxMarks)/(+this.quiz.numberOfQuestions)
  }

  close() {
    this.dialogRef.close()
  }
}
