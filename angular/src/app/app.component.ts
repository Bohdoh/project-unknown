import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "./interfaces/game";
import {Router} from "@angular/router";
import {RegisterRequest} from "./interfaces/RegisterRequest";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'angular';
  @ViewChild('loginRegisterModal') loginRegisterModal!: ElementRef;
  @ViewChild('mainContent') mainContent!: ElementRef;
    flip: boolean = false;

  fadeOut: boolean = false;
  userRegistration?:RegisterRequest;

  games? : Game[];

  constructor(private http:HttpClient,private router: Router){};

  ngOnInit(): void {
    this.http.get<Game[]>("http://localhost:8080/api/games").subscribe(
      games => {
                this.games = games
      }
    )
    this.userEmail = localStorage.getItem('email');
    this.userToken = localStorage.getItem('token');
  }

  userEmail: string | null = null;
  userToken: string | null = null;



  isLoggedIn(): boolean {
    return this.userEmail !== null && this.userToken !== null;
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.userEmail = null;
    this.userToken = null;
    this.router.navigate(['/']);
  }

  onShowLogin() {
    this.loginRegisterModal.nativeElement.classList.add('is-active');
    this.mainContent.nativeElement.classList.add('blur-background');
    this.flip = false;
  }

  onShowRegister() {
    this.loginRegisterModal.nativeElement.classList.add('is-active');
    this.mainContent.nativeElement.classList.add('blur-background');
    this.flip = true;
  }

  closeModal() {
    this.loginRegisterModal.nativeElement.classList.remove('is-active');
    this.mainContent.nativeElement.classList.remove('blur-background');
  }

  flipModal() {
    this.flip = !this.flip;
  }
  fadeOutOnLogin() {
    this.fadeOut = true;
    setTimeout(() => {
      this.closeModal();
      this.fadeOut = false;
    }, 450); // Match the duration of the collapseAnimation
  }
}
