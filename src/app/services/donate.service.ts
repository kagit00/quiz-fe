import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private http: HttpClient) { }

  public createOrder(amount: any) {
    return this.http.post(`${baseUrl}/donation/create_order`, {amount});
  }
}
