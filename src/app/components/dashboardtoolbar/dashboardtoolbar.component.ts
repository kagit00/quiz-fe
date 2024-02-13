import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboardtoolbar',
  templateUrl: './dashboardtoolbar.component.html',
  styleUrl: './dashboardtoolbar.component.css'
})
export class DashboardtoolbarComponent {
  constructor(private loginService: LoginService) {}

  user = this.loginService.getUser()

  logOut() {
    this.loginService.logOut();
  }
}
