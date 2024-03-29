import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../services/question.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrl: './updatequestion.component.css'
})
export class UpdatequestionComponent {
  question: any
  index: number = 0
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdatequestionComponent>,
    private questionService: QuestionService,
    private logInService: LoginService,
    private _snackBar: MatSnackBar
  ) {
    this.question = { ...data };
  }

  close(): void {
    this.dialogRef.close()
  }

  updateQuestion() {
    if (this.question.content == null || this.question.content == '') {
      this._snackBar.open("Question Content is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
    
    this.questionService.updateQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Got Updated Successfully', 'success')
        this.close()
      },
      (error: any) => {
        if (error.status === 401) this.logInService.logOut()
        Swal.fire('Error', error.error.message ? error.error.message : 'Something went wrong', 'error')
        this.close()
      }
    )
  }
}
