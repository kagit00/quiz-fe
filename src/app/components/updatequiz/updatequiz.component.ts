import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdatecategoryComponent } from '../updatecategory/updatecategory.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatequiz',
  templateUrl: './updatequiz.component.html',
  styleUrl: './updatequiz.component.css'
})
export class UpdatequizComponent {
  quiz: any
  categories: { cid: string, title: string, description: string }[] = []
  selectedOption: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdatecategoryComponent>,
    private quizService: QuizService,
    private _snackBar: MatSnackBar,
  ) {
    this.quiz = { ...data };
  }

  close(): void {
    this.dialogRef.close();
  }

  updateQuizData() {
    if (this.quiz.title == '' || this.quiz.title == null) {
      this._snackBar.open("Title is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    if (this.quiz.description == '' || this.quiz.description == null) {
      this._snackBar.open("Description is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz Got Updated Successfully', 'success')
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }
}
