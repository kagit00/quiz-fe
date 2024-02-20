import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../../services/quiz.service';
import { AddquizComponent } from '../../components/addquiz/addquiz.component';
import { UpdatequizComponent } from '../../components/updatequiz/updatequiz.component';
import { QustionsofquizComponent } from '../../components/qustionsofquiz/qustionsofquiz.component';
import { QuizfilterComponent } from '../../components/quizfilter/quizfilter.component';
import { FilterService } from '../../services/filter.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  constructor(
    private logInService: LoginService,
    private dialog: MatDialog,
    private quizService: QuizService,
    private filterService: FilterService,
    private _snackBar: MatSnackBar
  ) { }

  quizzes: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  displayedQuizzesGrid: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  displayedQuizzesList: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  gridPageSize: number = 6;
  listPageSize: number = 3;
  gridPageSizeOptions: number[] = [3, 5, 6];
  listPageSizeOptions: number[] = [2, 3];
  role: any = this.logInService.getUserRole()

  quizFilter = {
    quizFilterParams: {
      'titleStartsWith': '',
      'titleContains': '',
      'categories': [] as { cid: string, title: string, description: string }[]
    },
    filterData: [] as { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[]
  }

  ngOnInit(): void {
    this.filterService.getFilteredQuizzes().subscribe(
      (data: any) => {
        this.getFilterParams();
        if (this.quizFilter.quizFilterParams.titleStartsWith !== '' ||
          this.quizFilter.quizFilterParams.titleContains !== '' || (this.quizFilter.quizFilterParams.categories !== null &&
          this.quizFilter.quizFilterParams.categories.length > 0)) {
          this.quizzes = data;
          this.displayedQuizzesGrid = this.quizzes;
          this.displayedQuizzesList = this.quizzes;
          return
        } else
          this.getAllQuizzes()
      }
    )
  }

  getFilterParams() {
    this.filterService.getFilterParams().subscribe(
      (data: any) => {
        this.quizFilter.quizFilterParams = data;
      },
      (error: any) => {
        this._snackBar.open("Something went wrong." + error, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        return
      }
    )
  }

  viewMode: 'grid' | 'list' = 'list';

  toggleView(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.displayedQuizzesGrid = this.quizzes.slice(0, 6);
    this.displayedQuizzesList = this.quizzes.slice(0, 3);
  }

  getAllQuizzes() {
    this.quizService.getQuizzes(this.quizFilter.quizFilterParams).subscribe(
      (data: any) => {
        this.quizzes = data.body;
        this.displayedQuizzesGrid = this.quizzes.slice(0, this.gridPageSize);
        this.displayedQuizzesList = this.quizzes.slice(0, this.listPageSize);
      },
      (error: any) => {
        if (error.status === 401)
          this.logInService.logOut()
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }

  openModalForQuizOperation() {
    if (this.role == 'ADMIN')
      this.dialog.open(AddquizComponent);
    else if (this.role == 'USER')
      this.dialog.open(QuizfilterComponent);
  }

  openModalForQuestions(quiz: any) {
    this.dialog.open(QustionsofquizComponent, { data: quiz });
  }

  openModalForQuizUpdate(quiz: any) {
    this.dialog.open(UpdatequizComponent, { data: quiz });
  }

  onPageChangeGrid(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedQuizzesGrid = this.quizzes.slice(startIndex, endIndex);
  }

  onPageChangeList(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedQuizzesList = this.quizzes.slice(startIndex, endIndex);
  }

  deleteQuiz(id: string) {
    this.quizService.delete(id).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz Got Deleted Successfully', 'success')
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }
}
