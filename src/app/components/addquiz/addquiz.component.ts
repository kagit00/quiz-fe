import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { QuizService } from '../../services/quiz.service';
import { LoginService } from '../../services/login.service';
import lodash from 'lodash';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrl: './addquiz.component.css'
})
export class AddquizComponent {
  constructor(
      public dialogRef: MatDialogRef<AddquizComponent>, 
      private categoryService: CategoryService, 
      private _snackBar: MatSnackBar, 
      private quizService: QuizService,
      private logInService: LoginService
    ) {}

  quiz = { 
    quizId: '', 
    title: '', 
    description: '', 
    maxMarks: 0, 
    numberOfQuestions: 0, 
    category: { 
      cid: '', 
      title: '', 
      description: ''
    } 
  }
  categories: { cid: string, title: string, description: string }[] = []
  selectedOption: any;

  ngOnInit(): void {
    this.getAllCategories()
  }

  onOptionSelected() {
    this.quiz.category = this.selectedOption;
  }

  saveQuiz() {
    if (this.quiz.title == '' || this.quiz.title == null) {
      this._snackBar.open("Title is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.quiz.description == '' || this.quiz.description == null) {
      this._snackBar.open("Description is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.quiz.numberOfQuestions <= 0 || this.quiz.description == null) {
      this._snackBar.open("Description is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.quiz.maxMarks <=0 || this.quiz.maxMarks == null) {
      this._snackBar.open("Description is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.selectedOption == null || lodash.isEmpty(this.selectedOption)) {
      this._snackBar.open("Quiz Category is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.quizService.addQuiz(this.quiz).subscribe(
      (data: any) => {
        this.close()
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
        this.close();
      }
    )
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.body;
      },
      (error: any) => {
        if (error.status === 401)
          this.logInService.logOut()
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }

  close(): void {
    this.dialogRef.close();
  }
}
