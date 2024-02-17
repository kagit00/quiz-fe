import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
     constructor(private logIn: LoginService) { }
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          let authReq = req
          const token = this.logIn.getToken();
          if (this.shouldAddHeaders(req.url)) {
               const token = this.logIn.getToken();
               if (token) {
                    const authReq = req.clone({
                         setHeaders: { 'Authorization': `Bearer ${token}` }
                    });
                    return next.handle(authReq);
               }
          }
          return next.handle(authReq)
     }

     private shouldAddHeaders(url: string): boolean {
          const allowedUrls = [`/auth/current-user`, `/users/`, '/categories/', '/quizzes/', '/questions/'];
          return allowedUrls.some(allowedUrl => url.includes(allowedUrl));
     }
}

export const authInterCeptorProviders = [{
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true
}]

