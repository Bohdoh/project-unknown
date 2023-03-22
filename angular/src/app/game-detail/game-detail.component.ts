import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../interfaces/game";
import {Category} from "../interfaces/category";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Enduser} from "../interfaces/enduser";
import {CommentPost} from "../interfaces/comment-post";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReviewPost} from "../interfaces/review-post";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  gameId?: number;
  game?: Game;
  showComment: boolean = true;
  showReview: boolean = false;
  isLoggedIn?: boolean;
  username: string | any;
  role?: string;
  commentContent?: string;
  reviewContent?: string;
  currentUser?: Enduser;


  constructor(private http: HttpClient,
              private gameService: GameService,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGameById(this.gameId).subscribe((game: Game) => {
      this.game = game;
    });
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.role.subscribe((data: string) => this.role = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
    this.role = this.authService.getRole();
    this.authService.getUserByUsername(this.username).subscribe((user: Enduser) => {
      this.currentUser = user
    });
  }

  addComment(comment?: string,) {
    if (this.gameId && comment) {
      let payload: CommentPost = {
        gameId: this.gameId,
        username: this.username,
        content: comment
      }
      this.http.post<CommentPost>("http://localhost:8080/api/comment", payload).subscribe();
      location.reload();
    }


  }

  addReview(review?: string) {
    if (this.gameId && review) {
      let payload: ReviewPost = {
        gameId: this.gameId,
        username: this.username,
        content: review
      }
      this.http.post<ReviewPost>("http://localhost:8080/api/review", payload).pipe(
        switchMap(() => this.gameService.getGameById(Number(this.gameId)))
      )
        .subscribe((game: Game) => {
          this.game = game;
        });



    }

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
