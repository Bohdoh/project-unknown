import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../interfaces/game";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {TimerService} from "../services/timer.service";
import {AuthService} from "../services/auth.service";
import {Enduser} from "../interfaces/enduser";
import {CommentPost} from "../interfaces/comment-post";
import {Comment} from "../interfaces/comment";
import {ReviewPost} from "../interfaces/review-post";
import {switchMap} from "rxjs";
import {StringToEmojiService} from "../services/string-to-emoji.service";
import {Review} from "../interfaces/review";


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
  userRating: number = 0;


  constructor(private http: HttpClient,
              private gameService: GameService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private timerService: TimerService,
              private emojiService: StringToEmojiService
              ) {
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
      this.http.post<CommentPost>("http://localhost:8080/api/comment", payload)
        .pipe(
          switchMap(() => this.gameService.getGameById(Number(this.gameId)))
        )
        .subscribe((game: Game) => {
          this.game = game;
        });
    }
    this.commentContent = undefined;
  }

  startGame() {
    this.timerService.startTimer();
  }

  addReview(content?: string, rating?: number) {
    if (rating === 0) {
      // Display an error message or prevent the form submission
      console.log('Please select a rating before submitting your review');
      return;
    }

    if (this.gameId && content && rating) {
      let payload: ReviewPost = {
        gameId: this.gameId,
        username: this.username,
        content: content,
        rating: rating
      }
      this.http.post<ReviewPost>("http://localhost:8080/api/review", payload).pipe(
        switchMap(() => this.gameService.getGameById(Number(this.gameId)))
      )
        .subscribe((game: Game) => {
          this.game = game;
        });
    }
    this.reviewContent = undefined;
    this.userRating = 0;
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

  deleteComment(comment: Comment) {
      this.http.post<number>('http://localhost:8080/api/comments/delete', comment.commentId).pipe(
        switchMap(() => this.gameService.getGameById(Number(this.gameId)))
      ).subscribe((game: Game) => {
        this.game = game;
      });
  }

  emojiConvertComment(text?: string) {
    if (text) {
      this.commentContent = this.emojiService.emojiConvert(text);
    }
  }

  emojiConvertReview(text?: string) {
    if (text) {
      this.reviewContent = this.emojiService.emojiConvert(text);
    }
  }

  canDeleteComment(comment: Comment) {
    return comment.enduser.username === this.username || this.role === "ADMIN"
  }

  canDeleteReview(review: Review) {
    return review.enduser.username === this.username || this.role === "ADMIN"
  }

  deleteReview(review: Review) {
    console.log(review.id)
    this.http.post<number>('http://localhost:8080/api/reviews/delete', review.id).pipe(
      switchMap(() => this.gameService.getGameById(Number(this.gameId)))
    ).subscribe((game: Game) => {
      this.game = game;
    });
  }
}
