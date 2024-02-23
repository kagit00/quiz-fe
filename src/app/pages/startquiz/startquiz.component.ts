import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { RefreshService } from '../../services/refresh.service';
import { QuestionService } from '../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrl: './startquiz.component.css'
})
export class StartquizComponent {
  constructor(
    private router: Router,
    private locationStrategy: LocationStrategy,
    private rout: ActivatedRoute,
    private logInService: LoginService,
    private refreshDetectionService: RefreshService,
    private questionService: QuestionService,
  ) { }

  quizId: any = '';
  quizSubmitted: boolean = false;
  questionsOfQuiz: { "questionId": string, "content": string, "options": any, "imageUrl": string | undefined, "correctAnswer": string, quiz: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } } }[] = []
  selectedOptions: string[] = Array(this.questionsOfQuiz.length).fill('');
  correctlySubmittedAnswersCount: number = 0;
  quiz: any = {}
  timeLeft: any;
  totalTimeTaken: any
  currentQuestionIndex: number = 0;

  ngOnInit() {
    this.quizId = this.rout.snapshot.params['quizId']
    this.preventBackButton()
    if (this.refreshDetectionService.getIsRefresh()) {
      this.router.navigate(['/']);
    }
    this.getQuestionsOfQuiz()
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionsOfQuiz.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  startTimer() {
    let timeInterVal = window.setInterval(() => {
      if (this.timeLeft <= 0) {
        this.evaluateQuiz()
        clearInterval(timeInterVal)
      } else this.timeLeft--
    }, 1000)
  }

  preventBackButton() {
    history.pushState(null, '', location.href)
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href)
      this.logInService.logOut()
    })
  }

  getQuestionsOfQuiz() {
    this.questionService.getQuestionsOfQuiz(this.quizId).subscribe(
      (data: any) => {
        this.questionsOfQuiz = data.body;
        this.timeLeft = this.questionsOfQuiz.length * 3 * 60;
        this.totalTimeTaken = this.timeLeft;
        this.startTimer()
      },
      (error: any) => {
        Swal.fire('Error', error.error.message ? error.error.message : 'Something went wrong', 'error')
      }
    )
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} mins and ${remainingSeconds} secs`;
  }

  submitQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      icon: 'info'
    }).then(e => {
      if (e.isConfirmed) {
        this.evaluateQuiz()
      }
    })
  }

  evaluateQuiz() {
    this.quizSubmitted = true;
    for (let i = 0; i < this.questionsOfQuiz.length; i++) {
      const selectedAnswer = this.selectedOptions[i];
      const correctAnswer = this.questionsOfQuiz[i].correctAnswer;
      if (selectedAnswer === correctAnswer)
        this.correctlySubmittedAnswersCount += 1;
    }
    this.totalTimeTaken -= this.timeLeft 
  }

  exit() {
    this.logInService.logOut()
  }
}
