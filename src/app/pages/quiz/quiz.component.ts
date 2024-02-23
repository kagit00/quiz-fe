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
import { QuizinstructionComponent } from '../../components/quizinstruction/quizinstruction.component';
import { QuestionService } from '../../services/question.service';

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
    private _snackBar: MatSnackBar,
    private questionService: QuestionService
  ) { }

  quizzes: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  displayedQuizzesGrid: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  displayedQuizzesList: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  gridPageSize: number = 6;
  listPageSize: number = 3;
  gridPageSizeOptions: number[] = [3, 6];
  listPageSizeOptions: number[] = [3];
  role: any = this.logInService.getUserRole()
  categories: any = []
  questionsOfQuizLength: any = 0

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

  getQuestionsOfQuiz(quizId: any) {
    this.questionService.getQuestionsOfQuiz(quizId).subscribe(
      (data: any) => {
        this.questionsOfQuizLength = data.body.length;
      },
      (error: any) => {
        Swal.fire('Error', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }

  getFilterParams() {
    this.filterService.getFilterParams().subscribe(
      (data: any) => {
        this.quizFilter.quizFilterParams = data;
        this.categories = this.quizFilter.quizFilterParams.categories
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

  checkIfQuestionsAvailable(quiz: any) {
    this.questionService.getQuestionsOfQuiz(quiz.quizId).subscribe(
      (data: any) => {
        this.questionsOfQuizLength = data.body.length;
        if (this.questionsOfQuizLength < 1) {
          this._snackBar.open("Sorry! No questions available under this quiz", '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          return
        }
        this.openQuizInstruction(quiz)
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
      this.dialog.open(QuizfilterComponent, { data: this.categories });
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

  refresh() {
    this.quizFilter.filterData = []
    this.quizFilter.quizFilterParams.categories = []
    this.quizFilter.quizFilterParams.titleContains = ''
    this.quizFilter.quizFilterParams.titleStartsWith = ''
    this.filterService.setFilterParams(this.quizFilter.quizFilterParams)
    this.filterService.setFilteredQuizzes(this.quizFilter.filterData)
  }

  openQuizInstruction(quiz: any) {
    this.dialog.open(QuizinstructionComponent, { data: quiz })
  }
}
