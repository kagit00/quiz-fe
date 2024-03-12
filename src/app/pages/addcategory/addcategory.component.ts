import { Component, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
  constructor(public dialogRef: MatDialogRef<AddcategoryComponent>, private categoryService: CategoryService, private _snackBar: MatSnackBar) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.initSpeechRecognition();
  }

  category = {
    'categoryCode': '',
    'title': '',
    'description': ''
  }

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
              this.category.description += transcript;
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

  saveCategory() {
    if (this.category.title == '' || this.category.title == null) {
      this._snackBar.open("Title is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    if (this.category.description == '' || this.category.description == null) {
      this._snackBar.open("Description is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.close();
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
        this.close()
      }
    )
  }

  close(): void {
    this.dialogRef.close();
  }
}
