import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor() { }

  private filteredQuizzesSubject = new BehaviorSubject<{ quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[]>([]);
  filteredQuizzes$: Observable<{ quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[]> = this.filteredQuizzesSubject.asObservable();

  private filterParamsSubject = new BehaviorSubject<{ titleStartsWith: string, titleContains: string, categories: { cid: string, title: string, description: string }[] }>({
    titleStartsWith: '', 
    titleContains: '',
    categories: []
  })
  filterParams$: Observable<{ titleStartsWith: string, titleContains: string, categories: { cid: string, title: string, description: string }[] }> = this.filterParamsSubject.asObservable();


  setFilteredQuizzes(data: { quizId: string, title: string, description: string, maxMarks: number, numberOfQuestions: number, category: { cid: string, title: string, description: string } }[]) {
    this.filteredQuizzesSubject.next(data);
  }

  setFilterParams(data: { titleStartsWith: string, titleContains: string, categories: { cid: string, title: string, description: string }[] }) {
    this.filterParamsSubject.next(data);
  }

  getFilteredQuizzes() {
    return this.filteredQuizzes$;
  }

  getFilterParams() {
    return this.filterParams$;
  }
}
