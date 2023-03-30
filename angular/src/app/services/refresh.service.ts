import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {RegisterRequest} from "../interfaces/RegisterRequest";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private darkmode = false;
  private refresh = new Subject<void>();
  private refreshNavImage = new Subject<void>();
  private refreshLoginInput = new Subject<void>();
  usernameSource = new BehaviorSubject<string>('');
  passwordSource = new BehaviorSubject<string>('');

  refresh$ = this.refresh.asObservable();
  refreshNavImage$ = this.refreshNavImage.asObservable();
  refreshLoginInput$ = this.refreshLoginInput.asObservable();


  triggerRefreshEvent() {
    this.refresh.next();
  }

  triggerNavImageRefresh(){
    this.refreshNavImage.next();
  }

  triggerLoginInputRefresh(){
    this.refreshLoginInput.next();
  }

  setUsername(username: string) {
    this.usernameSource.next(username);
  }

  setPassword(password: string) {
    this.passwordSource.next(password);
  }

  setDarkmode(value:boolean) {
    this.darkmode = value;
  }

  getDarkmode():boolean{
    return this.darkmode;
  }
}
