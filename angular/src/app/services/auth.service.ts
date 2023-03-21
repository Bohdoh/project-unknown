import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {RegisterRequest} from '../interfaces/RegisterRequest';
import {AuthenticationResponse} from '../interfaces/AuthenticationResponse';
import {AuthenticationRequest} from '../interfaces/AuthenticationRequest';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from "ngx-webstorage";
import {Enduser} from "../interfaces/enduser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() role: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getJwtToken(),
    username: this.getUsername(),
    role: this.getRole()
  }
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private authStatus = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, request);
  }

  authenticate(request: AuthenticationRequest): Observable<boolean> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`,
      request).pipe(map(data => {
      this.localStorage.store('username', data.username);
      this.localStorage.store('token', data.token);
      this.localStorage.store('role', data.role);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      this.role.emit(data.role);
      return true;
    }));
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, this.refreshTokenPayload,
      {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('token');
    this.localStorage.clear('username');
    this.localStorage.clear('role');
    this.localStorage.clear('refreshToken');
  }

  getJwtToken() {
    return this.localStorage.retrieve('token');
  }

  setAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getUserByUsername(username: string): Observable<Enduser> {
    return this.http.get<Enduser>("http://localhost:8080/api/users/" + username);
  }

  getRole() {
    return this.localStorage.retrieve('role');
  }
}
