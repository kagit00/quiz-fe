import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterCeptorProviders } from './services/auth.interceptor';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DeleteprofileComponent } from './pages/deleteprofile/deleteprofile.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { DonationComponent } from './pages/donation/donation.component';
import { DashboardtoolbarComponent } from './components/dashboardtoolbar/dashboardtoolbar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatecategoryComponent } from './components/updatecategory/updatecategory.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import { UpdatequizComponent } from './components/updatequiz/updatequiz.component';
import { AddquizComponent } from './components/addquiz/addquiz.component';
import { MatSelectModule } from '@angular/material/select';
import { QustionsofquizComponent } from './components/qustionsofquiz/qustionsofquiz.component';
import { AddquestionComponent } from './components/addquestion/addquestion.component';
import { UpdatequestionComponent } from './components/updatequestion/updatequestion.component';
import { QuizfilterComponent } from './components/quizfilter/quizfilter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuizinstructionComponent } from './components/quizinstruction/quizinstruction.component';
import { StartquizComponent } from './pages/startquiz/startquiz.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BotComponent } from './components/bot/bot.component';
import { MatTooltipModule } from '@angular/material/tooltip';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdmindashboardComponent,
    UserdashboardComponent,
    ProfileComponent,
    SidebarComponent,
    DeleteprofileComponent,
    WelcomeComponent,
    CategoriesComponent,
    QuizComponent,
    DonationComponent,
    DashboardtoolbarComponent,
    HeaderComponent,
    DashboardComponent,
    AddcategoryComponent,
    UpdatecategoryComponent,
    UpdatequizComponent,
    AddquizComponent,
    QustionsofquizComponent,
    AddquestionComponent,
    UpdatequestionComponent,
    QuizfilterComponent,
    QuizinstructionComponent,
    StartquizComponent,
    BotComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    NgbModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgSelectModule,
    MatRadioModule,
    MatTooltipModule,
    NgxUiLoaderModule.forRoot({  "bgsColor": "red",
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#ffffff",
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "three-strings",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": "red",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": false,
    "text": "Loading...",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300}),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [provideNativeDateAdapter(), authInterCeptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
