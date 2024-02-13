import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private logInService: LoginService) {}
  role = this.logInService.getUserRole()
}
