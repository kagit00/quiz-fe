import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { QuestionService } from '../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrl: './addquestion.component.css'
})
export class AddquestionComponent {
  constructor(
    public dialogRef: MatDialogRef<AddquestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private questionService: QuestionService,
    private logInService: LoginService
  ) {
    this.question.quiz = { ...data };
  }
  question = {
    content: '',
    options: [] as string[],
    imageUrl: '',
    correctAnswer: '',
    quiz: {
      quizId: '',
      title: '',
      description: '',
      maxMarks: 0,
      numberOfQuestions: 10,
      category: {
        cid: '',
        title: ''
      }
    }
  }

  option1 = ''
  option2 = ''
  option3 = ''
  option4 = ''

  close() {
    this.dialogRef.close()
  }

  saveQuestion() {
    if (this.question.content == null || this.question.content == '') {
      this._snackBar.open("Question content is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }
    
    this.question.options = [this.option1, this.option2, this.option3, this.option4]
    if (this.question.options.length < 4) {
      this._snackBar.open("Question options is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    if (this.question.correctAnswer == null || this.question.correctAnswer == '') {
      this._snackBar.open("Question correct answer is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added Successfully', 'success')
      },
      (error: any) => {
        Swal.fire('Error', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }
}
