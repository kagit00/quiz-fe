import { Component, Inject, Input, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrl: './updatecategory.component.css'
})
export class UpdatecategoryComponent {
  category: any
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdatecategoryComponent>,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {
    this.category = { ...data };
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.initSpeechRecognition();
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

  close(): void {
    this.dialogRef.close();
  }

  updateCategoryData() {
    if (this.category.title == '' || this.category.title == null) {
      this._snackBar.open("Title is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.category.description == '' || this.category.description == null) {
      this._snackBar.open("Description is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.categoryService.updateCategory(this.category).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Category Got Updated Successfully', 'success')
        this.close()
      },
      (error: any) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
        this.close()
      }
    )
  }
}
