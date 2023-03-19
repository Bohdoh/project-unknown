import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "./interfaces/game";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'angular';

  games? : Game[];

  constructor(private http:HttpClient){};

  ngOnInit(): void {
    this.http.get<Game[]>("http://localhost:8080/api/games").subscribe(
      games => {
                this.games = games
      }
    )
  }
}
