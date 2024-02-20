import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { FilterService } from '../../services/filter.service';
import { QuizService } from '../../services/quiz.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-quizfilter',
  templateUrl: './quizfilter.component.html',
  styleUrl: './quizfilter.component.css'
})
export class QuizfilterComponent {
  constructor(
    public dialogRef: MatDialogRef<QuizfilterComponent>,
    private categoryService: CategoryService,
    private filterService: FilterService,
    private quizService: QuizService,
    private loginService: LoginService
  ) {
  }

  categories = new FormControl()
  categoryList: { cid: string, title: string, description: string }[] = []

  ngOnInit() {
    this.getAllCategories();
  }

  quizFilter = {
    quizFilterParams: {
      'titleStartsWith': '',
      'titleContains': '',
      'categories': [] as { cid: string, title: string, description: string }[]
    },
    filterData: [] as { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[]
  }

  close() {
    this.dialogRef.close()
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categoryList = data.body
      },
      (error: any) => {
        Swal.fire('Error', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }


  filterQuizData() {
    this.quizFilter.quizFilterParams.categories = this.categories.value;
    this.quizService.getQuizzes(this.quizFilter.quizFilterParams).subscribe(
      (data: any) => {
        //console.log(data)
        this.quizFilter.filterData = data.body
        this.filterService.setFilterParams(this.quizFilter.quizFilterParams)
        this.filterService.setFilteredQuizzes(this.quizFilter.filterData)
      },
      (error: any) => {
        console.log(error)
        if (error.status === 401) this.loginService.logOut
        Swal.fire('Error', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }
}
