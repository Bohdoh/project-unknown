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
  commentContent?: string;
  reviewContent?: string;
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

  addComment(comment?: string,) {
    if(this.gameId && comment){
    let payload :CommentPost = {
      gameId:this.gameId,
      username:this.username,
      content:comment
    }
    this.http.post<CommentPost>("http://localhost:8080/api/comment",payload);
    }


  }


//  reviewRepository.save(new Review("Ich gebe dem spiel eine 5 von 5!", enduserRepository.getById(1), gameRepository.findByGameId(7) ));
  addReview() {

  }


  switchCommentAndReviews(tabValue: string) {
      switch (tabValue) {
      case 'comments':
        this.showComment = true;
        this.showReview = false;
        break;
      case 'reviews':
        this.showComment = false;
        this.showReview = true;
        break;
      }

    }

  deleteComment(commentId: number, newestTitle: any) {

  }
}
