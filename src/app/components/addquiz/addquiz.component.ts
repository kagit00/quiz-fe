import { Component, NgZone } from '@angular/core';
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
  ) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.initSpeechRecognition();
  }

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
  listnerStarted: boolean = true;
  listenerStopped: boolean = false;
  recognition: any;
  zone: any;
  interimTranscript = ''

  handleListening() {
    this.listnerStarted = !this.listnerStarted;
    this.listenerStopped = !this.listenerStopped;
  }

  startListening() {
    if (this.recognition)
      this.recognition.start();
  }

  stopListening() {
    if (this.recognition)
      this.recognition.stop();
  }

  ngOnInit(): void {
    this.getAllCategories()
  }

  initSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en'; // Set the language as needed

      this.recognition.onresult = (event: any) => {
        this.interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.zone.run(() => {
              this.quiz.description += transcript;
            });
          } else {
            this.interimTranscript += ' ' + transcript;
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      console.error('Speech Recognition API not supported in this browser.');
    }
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

    if (this.quiz.numberOfQuestions <= 0 || this.quiz.numberOfQuestions == null) {
      this._snackBar.open("Number of questions is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.quiz.maxMarks <= 0 || this.quiz.maxMarks == null) {
      this._snackBar.open("Maximum marks required.", '', {
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
        Swal.fire('Success', 'Quiz Got Added Successfully. Please Refresh To Reflect Changes.', 'success')
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
