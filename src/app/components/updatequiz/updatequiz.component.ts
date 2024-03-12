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

    if (this.quiz.maxMarks <=0 || this.quiz.maxMarks == null) {
      this._snackBar.open("Maximum marks required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz Got Updated Successfully. Please Refresh To Reflect Changes.', 'success')
        this.close()
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
        this.close()
      }
    )
  }
}
