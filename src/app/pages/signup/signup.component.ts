import { Component, OnInit } from '@angular/core';
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
  ) { }

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

    this.userService.addUser(this.user).subscribe(
      (data) => {
        this.logInService.generateToken({
          "username": this.user.username,
          "password": this.user.password
        }).subscribe(
          (data: any) => {
            this.logInService.logIn(data.token)
            this.logInService.getCurrentUser().subscribe((user: any) => {
              this.logInService.setUser(user)
              if (this.logInService.getUserRole() == 'ADMIN') {
                window.location.href = '/admindashboard'
              } else if (this.logInService.getUserRole() == 'USER') {
                window.location.href = '/userdashboard'
              }
            })
          },
          (error) => {
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
