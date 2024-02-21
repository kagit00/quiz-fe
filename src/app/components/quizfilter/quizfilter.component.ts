import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { FilterService } from '../../services/filter.service';
import { QuizService } from '../../services/quiz.service';
import { LoginService } from '../../services/login.service';
import * as _ from 'lodash';

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
    private loginService: LoginService,
  ) {}

  categoryList: { cid: string, title: string, description: string }[] = []

  ngOnInit() {
    this.getAllCategories();
    this.getFilterParams()
  }

  quizFilter = {
    quizFilterParams: {
      'titleStartsWith': '',
      'titleContains': '',
      'categories': [] as { cid: string, title: string, description: string }[]
    },
    filterData: [] as { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[]
  }
  appliedFilters: any = []

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

  getFilterParams() {
    this.filterService.getFilterParams().subscribe(
      (data: any) => {
        this.quizFilter.quizFilterParams = data
        this.appliedFilters.push(this.quizFilter.quizFilterParams.categories)
      },
      (error: any) => {
        Swal.fire('Error', 'Something went wrong', 'error')
      }
    )
  }

  filterQuizData() {
    this.quizService.getQuizzes(this.quizFilter.quizFilterParams).subscribe(
      (data: any) => {
        this.quizFilter.filterData = data.body
        this.filterService.setFilterParams(this.quizFilter.quizFilterParams)
        this.filterService.setFilteredQuizzes(this.quizFilter.filterData)
      },
      (error: any) => {
        if (error.status === 401) this.loginService.logOut
        Swal.fire('Error', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }

  removeCategory() {
    this.appliedFilters = []
    this.quizFilter.quizFilterParams.categories = []
  }

  reset() {
    this.removeCategory()
    this.quizFilter.quizFilterParams.titleContains = ''
    this.quizFilter.quizFilterParams.titleStartsWith = ''
  }
}

