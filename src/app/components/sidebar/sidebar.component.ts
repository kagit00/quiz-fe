import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isMobile: boolean = false;

  constructor(private logInService: LoginService, private breakpointObserver: BreakpointObserver) {}
  role = this.logInService.getUserRole()
  homeLink = this.role == 'ADMIN'? '/admindashboard' : (this.role == 'USER')? '/userdashboard' : '/'
  categoriesLink = this.role == 'ADMIN'? '/admindashboard/categories' : ((this.role == 'USER')? '/userdashboard/categories' : '/')
  quizLink = this.role == 'ADMIN'? '/admindashboard/quiz' : ((this.role == 'USER')? '/userdashboard/quiz' : '/')
  profileLink = this.role == 'ADMIN'? '/admindashboard/profile' : ((this.role == 'USER')? '/userdashboard/profile' : '/')
  donationLink = this.role == 'ADMIN'? '/admindashboard/donation' : ((this.role == 'USER')? '/userdashboard/donation' : '/')
  delProfileLink = this.role == 'ADMIN'? '/admindashboard/deleteprofile' : ((this.role == 'USER')? '/userdashboard/deleteprofile' : '/')

  ngOnInit() {
    this.breakpointObserver.observe(
      [Breakpoints.Handset]
    ).subscribe(result => {
      this.isMobile = result.matches
      console.log(this.isMobile)
    })
  }
}
