import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/users`, user);
  }

  public updateUser(username: string, user: any) {
    return this.http.put(`${baseUrl}/users/${username}`, user);
  }

  public deleteUser(username: string) {
    return this.http.delete(`${baseUrl}/users/${username}`);
  }

  public saveQuizScore(quizScoreInfo: any) {
    return this.http.post(`${baseUrl}/users/quiz/score`, quizScoreInfo);
  }
}
