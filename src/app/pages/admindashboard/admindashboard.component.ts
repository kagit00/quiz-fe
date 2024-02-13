import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  constructor(private loginService: LoginService) {}

  user = this.loginService.getUser()

  logOut() {
    this.loginService.logOut();
  }
}
