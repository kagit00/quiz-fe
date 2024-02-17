import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleteprofile',
  templateUrl: './deleteprofile.component.html',
  styleUrl: './deleteprofile.component.css'
})
export class DeleteprofileComponent {
  constructor(private logInService: LoginService, private _snackBar: MatSnackBar, private userService: UserService) { }
  iSDeleteMode = false
  username = ''

  deleteAccount() {
    this.iSDeleteMode = true
  }

  submitForm() {
    if (this.username == '' || this.username == null || this.logInService.getUser().username != this.username) {
      this._snackBar.open("Username is invalid.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return
    }

    this.userService.deleteUser(this.username).subscribe(
      (data) => {
        this.logInService.logOut()
        window.location.href = '/'
      },
      (error) => {
        if (error.status === 401) 
          this.logInService.logOut()
        Swal.fire('Oops', error.error.errorMsg ? error.error.errorMsg : 'Something went wrong', 'error')
      }
    )
    this.iSDeleteMode = false
  }
}
