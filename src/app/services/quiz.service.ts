import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  public getQuizzes(quizFilterParams: any): any { 
    return this.http.post(`${baseUrl}/quizzes/all`, quizFilterParams)
  }

  public addQuiz(quiz: any): any { 
    return this.http.post(`${baseUrl}/quizzes/`, quiz)
  }

  public updateQuiz(quiz: any): any { 
    return this.http.put(`${baseUrl}/quizzes/`, quiz)
  }

  public delete(quizId: any): any { 
    return this.http.delete(`${baseUrl}/quizzes/${quizId}`)
  }
}
