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
    return this.http.get<Game[]>('http://localhost:8080/api/games');
  }


  getGameById(id:number): Observable<Game> {
  return this.http.get<Game>('http://localhost:8080/api/games/'+id);
  }

  getChaptersByGameId(gameId:number): Observable<Chapter[]> {
  return this.http.get<Chapter[]>('http://localhost:8080/api/chapters/'+gameId);
  }

  deleteGame(gameId:number):void{
    this.http.delete<number>("http://localhost:8080/api/games/delete/"+gameId).subscribe();
  }

  getGameRating(game?:Game):number {
    let gameRating = 0;
    if (game) {
      for (let i = 0; i < game.reviews.length; i++) {
        gameRating += game.reviews[i].rating;
      }

      return gameRating / game.reviews.length;
    }
    return 0;
  }

  generateStars(gameRating:number): string[] {
    const fullStarIcon = 'fa-star';
    const halfStarIcon = 'fa-star-half-o';
    const emptyStarIcon = 'fa-star-o';

    const maxStars = 5;
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
      const ratingDiff = gameRating - i;
      if (ratingDiff >= 1) {
        stars.push(fullStarIcon);
      } else if (ratingDiff > 0) {
        stars.push(halfStarIcon);
      } else {
        stars.push(emptyStarIcon);
      }
    }
    return stars;
  }
}

