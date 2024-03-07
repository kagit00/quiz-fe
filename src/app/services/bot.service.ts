import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpClient) {
  }

  public generateResponseFromBot(query: any) {
    return this.http.post(`${baseUrl}/bot/query`, query);
  }
}
