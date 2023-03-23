import {Component, Input} from '@angular/core';
import {ReviewPost} from "../../interfaces/review-post";
import {switchMap} from "rxjs";
import {Game} from "../../interfaces/game";
import {Review} from "../../interfaces/review";
import {HttpClient} from "@angular/common/http";
import {GameService} from "../../services/game.service";
import {StringToEmojiService} from "../../services/string-to-emoji.service";
import {Enduser} from "../../interfaces/enduser";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  @Input() isLoggedIn?: boolean;
  @Input() gameId?: number;
  @Input() username: string | any;
  @Input() game?: Game;
  @Input() role?: string;
  @Input() userHasReview: boolean = true;
  @Input() currentUser?: Enduser;

  reviewIdBeingEdited : number = 0;
  reviewContent?: string;
  userRating :number = 0;
  editReviewContent? :string;

  constructor(private http:HttpClient,private gameService:GameService,private emojiService:StringToEmojiService) {
  }
  addReview(content ?: string, rating ?: number) {
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
        rating: rating,
        reviewId: this.reviewIdBeingEdited
      }
      this.http.post<ReviewPost>("http://localhost:8080/api/review", payload).pipe(
        switchMap(() => this.gameService.getGameById(Number(this.gameId)))
      )
        .subscribe((game: Game) => {
          this.game = game;
          this.userHasReview = this.userHasReviewcheck();
          this.reviewIdBeingEdited = 0;
        });
    }
    this.reviewContent = undefined;
    this.userRating = 0;
  }

  emojiConvertReview(text ?: string) {
    if (text) {
      const words = text.split(' ');
      const emojiWords = words.map((word) => {
        return this.emojiService.emojiConvert(word);
      });
      this.reviewContent = emojiWords.join(' ');
      this.editReviewContent = emojiWords.join(' ');
    }
  }

  canEditReview(review: Review) {
    return review.enduser.username === this.username || this.role === "ADMIN"
  }

  canDeleteReview(review: Review) {
    return review.enduser.username === this.username || this.role === "ADMIN"
  }

  deleteReview(review: Review) {
    this.http.post<number>('http://localhost:8080/api/reviews/delete', review.id).pipe(
      switchMap(() => this.gameService.getGameById(Number(this.gameId)))
    ).subscribe((game: Game) => {
      this.game = game;
      this.userHasReview = this.userHasReviewcheck();
    });
  }

  showEditFormForReview(review: Review): void {
    this.editReviewContent = review.content;
    this.reviewIdBeingEdited = review.id;
  }

  userHasReviewcheck(): boolean {
    console.log(this.game)
    if (this.game) {
      for (let review of this.game.reviews) {
        if (review.enduser.username === this.username) {
          return true;
        }
      }    }
    return false;
  }
}
