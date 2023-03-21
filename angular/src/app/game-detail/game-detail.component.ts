import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../interfaces/game";
import {Category} from "../interfaces/category";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit{

  gameId? : number;
  game?:Game;
  commentContent?: String;
  showComment: boolean = true;
  showReview: boolean = false;


  constructor(private http:HttpClient,private gameService : GameService,private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGameById(this.gameId).subscribe((game: Game) => {
      this.game = game;
    });
  }

  addComment() {

  }

  switchVisibility() {
    if (this.showComment){
      this.showComment = false;
      this.showReview = true;
    }else {
      this.showComment = true;
      this.showReview = false
    }
  }





}
