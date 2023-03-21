import { Injectable } from '@angular/core';
import {Game} from "../interfaces/game";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chapter} from "../interfaces/chapter";

@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(private http:HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:8082/api/games');
  }


  getGameById(id:number): Observable<Game> {
  return this.http.get<Game>('http://localhost:8082/api/games/'+id);
  }

  getChaptersByGameId(gameId:number): Observable<Chapter[]> {
  return this.http.get<Chapter[]>('http://localhost:8080/api/chapters/'+gameId);
  }
}

