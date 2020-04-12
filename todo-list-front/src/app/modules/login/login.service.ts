import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { LoginModel } from './login.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post(`${this.url}/api/auth/login`, loginModel, httpOptions)
      .pipe(
        catchError(err => {
          console.log('login error: ', err);
          return throwError(err);
        })
      );
  }

  setCurrentUserSession(user: any, token: string) {
    sessionStorage.setItem('currentUser', JSON.stringify({ user, token }));
  }
}
