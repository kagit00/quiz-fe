import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { DeleteprofileComponent } from './pages/deleteprofile/deleteprofile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DonationComponent } from './pages/donation/donation.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { QuizComponent } from './pages/quiz/quiz.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'deleteprofile',
        component: DeleteprofileComponent,
      },
      {
        path: 'donation',
        component: DonationComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
    ]
  },
  {
    path: 'userdashboard',
    component: UserdashboardComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'deleteprofile',
        component: DeleteprofileComponent,
      },
      {
        path: 'donation',
        component: DonationComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
