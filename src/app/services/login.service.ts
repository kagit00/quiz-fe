import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public generateToken(logInData: any) { 
    return this.http.post(`${baseUrl}/auth/token`, logInData);
  }

  public logIn(token: any) { 
    localStorage.setItem('token', token)
    return true
  }

  public isloggedIn() { 
    let token = localStorage.getItem('token')
    return token != undefined && token != '' && token != null
  }

  public logOut() { 
    localStorage.removeItem('token')
    window.location.href = '/'
    console.log("Token removed successfully")
  }

  public getToken() { 
    return localStorage.getItem('token')
  }

  public setUser(user: any) { 
    localStorage.setItem("user", JSON.stringify(user))
  }

  public getUser() { 
    let userStr = localStorage.getItem("user")
    if (userStr == null || userStr == '') {
      this.logOut();
      return null
    } else {
      return JSON.parse(userStr);
    }
  }

  public getUserRole()  {
    let user = this.getUser()
    let userRoles = []
    if (user != null) { 
      for (const i of user["authorities"]) { 
        userRoles.push(i.authority)
      }
    }
    return userRoles[0]
  }

  public getCurrentUser() { 
    return this.http.get(`${baseUrl}/auth/current-user`);
  }
}
