import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "./interfaces/game";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'angular';
  @ViewChild('loginModal') loginModal!: ElementRef;
  @ViewChild('registerModal') registerModal!: ElementRef;
  @ViewChild('mainContent') mainContent!: ElementRef;

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
    this.loginModal.nativeElement.classList.add('is-active');
    this.mainContent.nativeElement.classList.add('blur-background');
  }

  closeModalLogin() {
    this.loginModal.nativeElement.classList.remove('is-active');
    this.mainContent.nativeElement.classList.remove('blur-background');
  }

  closeModalRegister() {
    this.registerModal.nativeElement.classList.remove('is-active');
    this.mainContent.nativeElement.classList.remove('blur-background');
  }

  onShowRegister() {
    this.registerModal.nativeElement.classList.add('is-active');
    this.mainContent.nativeElement.classList.add('blur-background');
  }

  switchToLogin() {
    this.registerModal.nativeElement.classList.remove('is-active');
    this.loginModal.nativeElement.classList.add('is-active');
  }
}
