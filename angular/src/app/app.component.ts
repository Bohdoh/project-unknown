import {Component, Input, OnInit} from '@angular/core';
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

  games? : Game[];

  constructor(private http:HttpClient,private router: Router){};

  ngOnInit(): void {
    this.http.get<Game[]>("http://localhost:8081/api/games").subscribe(
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
}
