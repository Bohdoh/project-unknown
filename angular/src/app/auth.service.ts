import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from './interfaces/RegisterRequest';
import { AuthenticationResponse } from './interfaces/AuthenticationResponse';
import { AuthenticationRequest } from './interfaces/AuthenticationRequest';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8082/api/v1/auth';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, request);
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, request);
  }

  setAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
