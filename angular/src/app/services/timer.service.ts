import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private isPlayingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  private timerValue: number = 60;
  private timerSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.timerValue);
  public timer$: Observable<number> = this.timerSubject.asObservable();

  constructor() {}

  startTimer() {
    const interval = setInterval(() => {
      this.timerValue -= 1;
      this.timerSubject.next(this.timerValue);
      this.isPlayingSubject.next(true);
      if (this.timerValue <= 0) {
        clearInterval(interval);
        this.isPlayingSubject.next(false);
      }
    }, 1000);
  }

  resetTimer() {
    this.timerValue = 60;
    this.timerSubject.next(this.timerValue);
  }

  stopTimer(){
    this.isPlayingSubject.next(false);
  }

}
