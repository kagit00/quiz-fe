import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../../services/quiz.service';
import { AddquizComponent } from '../../components/addquiz/addquiz.component';
import { UpdatequizComponent } from '../../components/updatequiz/updatequiz.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  constructor(private logInService: LoginService, private dialog: MatDialog, private quizService: QuizService) { }
  quizzes: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  displayedQuizzesGrid: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  displayedQuizzesList: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[] = []
  gridPageSize: number = 6;
  listPageSize: number = 3;
  gridPageSizeOptions: number[] = [3, 5, 6];
  listPageSizeOptions: number[] = [2, 3];

  ngOnInit(): void {
    this.getAllQuizzes()
  }

  viewMode: 'grid' | 'list' = 'list';

  toggleView(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.displayedQuizzesGrid = this.quizzes.slice(0, 6);
    this.displayedQuizzesList = this.quizzes.slice(0, 3);
  }

  getAllQuizzes() {
    this.quizService.getQuizzes().subscribe(
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

  openModalForQuizAddition() {
    this.dialog.open(AddquizComponent);
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
        Swal.fire('Success', 'Category Got Deleted Successfully', 'success')
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }
}
