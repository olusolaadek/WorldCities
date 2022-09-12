import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected http: HttpClient) {}

  public tokenKey: string = 'token';

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(item: LoginRequest): Observable<LoginResult> {
    var url = environment.baseUrl + 'api/';
    return this.http.post<LoginResult>(url, item);
  }
}
