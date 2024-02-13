import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private logInService: LoginService, private _snackBar: MatSnackBar, private userService: UserService) {}

  isEditMode = false
  user = this.logInService.getUser();
  originalUsername = this.user.username
  updatedUser = {
    "username": '',
    "firstName": '',
    "lastName": '',
    "email": '',
    "phone": '',
    "about": '',
    "dateOfBirth": ''
  }


  toggleEditMode() {
    this.isEditMode = true
  }

  updateProfile() {
    this.updatedUser.username = this.user.username
    this.updatedUser.firstName = this.user.firstName
    this.updatedUser.lastName = this.user.lastName
    this.updatedUser.email = this.user.email
    this.updatedUser.phone = this.user.phone
    this.updatedUser.about = this.user.about
    this.updatedUser.dateOfBirth = this.user.dateOfBirth
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

    this.userService.updateUser(this.originalUsername, this.updatedUser).subscribe (
      (data) => {
        Swal.fire('Success', 'User updated successfully', 'success')
      },
      (error) => {
        Swal.fire('Oops', error.error.errorMsg? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
    this.isEditMode = false
  }
}
 