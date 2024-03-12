import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private logInService: LoginService
  ) {
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
              this.user.about += transcript;
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

  public user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    about: ''
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

  submitForm(): void {
    if (this.user.username == '' || this.user.username == null) {
      this._snackBar.open("Username is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }
    if (this.user.firstName == '' || this.user.firstName == null) {
      this._snackBar.open("First Name is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }
    if (this.user.email == '' || this.user.email == null) {
      this._snackBar.open("Email is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }
    if (this.user.phone == '' || this.user.phone == null) {
      this._snackBar.open("Phone is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }
    if (this.user.password == '' || this.user.password == null) {
      this._snackBar.open("Password is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    this.user.username = this.user.username.replace(/^\s+|\s+$/g, "")
    this.user.firstName = this.user.firstName.replace(/^\s+|\s+$/g, "")
    this.user.lastName = this.user.lastName.replace(/^\s+|\s+$/g, "")
    this.user.email = this.user.email.replace(/^\s+|\s+$/g, "")

    this.userService.addUser(this.user).subscribe(
      (data) => {
        this.logInService.generateToken({
          "username": this.user.username,
          "password": this.user.password
        }).subscribe(
          (data: any) => {
            this.logInService.logIn(data.body.token)
            this.logInService.getCurrentUser().subscribe((user: any) => {
              this.logInService.setUser(user.body)
              if (this.logInService.getUserRole() == 'ADMIN') {
                window.location.href = '/admindashboard'
              } else if (this.logInService.getUserRole() == 'USER') {
                window.location.href = '/userdashboard'
              }
            })
          },
          (error) => {
            if (error.status === 401)
              this.logInService.logOut()
            Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
          }
        )
      },
      (error) => {
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }
}
