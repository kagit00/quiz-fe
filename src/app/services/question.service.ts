import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  public getQuestionsOfQuiz(quizId: any): any { 
    return this.http.get(`${baseUrl}/questions/quiz/${quizId}`)
  }

  public addQuestion(question: any): any { 
    return this.http.post(`${baseUrl}/questions/`, question)
  }

  public updateQuestion(question: any): any { 
    return this.http.put(`${baseUrl}/questions/`, question)
  }

  public deleteQuestion(questionId: any): any { 
    return this.http.delete(`${baseUrl}/questions/${questionId}`)
  }
}
