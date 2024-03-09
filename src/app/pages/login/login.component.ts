import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _snackBar: MatSnackBar, private logInService: LoginService) {}
  logInData = {
    username: '',
    password: ''
  }

  submitForm(): void {
    if (this.logInData.username == '' || this.logInData.username == null) {
      this._snackBar.open("Username is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }
    
    if (this.logInData.password == '' || this.logInData.password == null) {
      this._snackBar.open("Password is required.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    this.logInData.username = this.logInData.username.replace(/^\s+|\s+$/g, "")

    this.logInService.generateToken(this.logInData).subscribe (
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
        Swal.fire('Oops', error.error.errorMsg? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
  }
}
