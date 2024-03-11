import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../services/question.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { UpdatequestionComponent } from '../updatequestion/updatequestion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddquestionComponent } from '../addquestion/addquestion.component';

@Component({
  selector: 'app-qustionsofquiz',
  templateUrl: './qustionsofquiz.component.html',
  styleUrl: './qustionsofquiz.component.css'
})
export class QustionsofquizComponent {
  quiz: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRefForQuiz: MatDialogRef<QustionsofquizComponent>,
    private questionService: QuestionService,
    private logInService: LoginService,
    private _snackBar: MatSnackBar
  ) {
    this.quiz = { ...data };
    this.getAllQuestionsOfQuiz();
  }

  questions: { "questionId": string, "content": string, "options": any, "imageUrl": string | undefined, "correctAnswer": string, quiz: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } } }[] = []
  questionsLengthForQuiz: any = 0;

  close(): void {
    this.dialogRefForQuiz.close();
  }

  deleteQuestion(questionId: string) {
    this.questionService.deleteQuestion(questionId).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Got Deleted Successfully. Please Refresh To Reflect Changes.', 'success')
      },
      (error: any) => {
        Swal.fire('Ooops', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }

  getAllQuestionsOfQuiz() {
    this.questionService.getQuestionsOfQuiz(this.quiz.quizId).subscribe(
      (data: any) => {
        this.questionsLengthForQuiz = this.quiz.numberOfQuestions
        this.questions = data.body
      },
      (error: any) => {
        if (error.status === 401)
          this.logInService.logOut()
        Swal.fire('Ooops', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }

  openModalForQuestionUpdate(question: any) {
    this.dialog.open(UpdatequestionComponent, { data: question })
  }

  openModalForQuestionAddition(quiz: any) {
    this.dialog.open(AddquestionComponent, {data: quiz})
  }
}