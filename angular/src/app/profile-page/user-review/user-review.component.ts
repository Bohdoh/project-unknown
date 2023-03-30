import {Component, Input} from '@angular/core';
import {ProfilDTO} from "../../interfaces/profil-dto";
import {Comment} from "../../interfaces/comment";
import {Review} from "../../interfaces/review";
import {ReviewService} from "../../services/review.service";
import {Game} from "../../interfaces/game";
import {GameService} from "../../services/game.service";

//
@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent {
  @Input() reviews: Review[] = [];
  @Input() username: string | undefined;
  @Input() games: Game[] = []; // add this line

  isGameSelected: boolean = false;
  gameSelected?: Game;
  editContent: string = '';
  filteredReviews: Review[]=[];
  userRating :number = 0;
  reviewContent?:string;
  reviewBeingEdited: Review | null = null;
  constructor(private reviewService: ReviewService,
              private gameService:GameService) {}

  deleteReview(review: Review): void {
    this.reviewService.deleteReview(review.id).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.id !== review.id);
    });
  }

  selectGame(game: Game) {
    this.gameSelected = game;
    this.isGameSelected = true;
    this.filteredReviews = [];

    this.gameService.getGameById(game.id).subscribe((game: Game) => {
      this.gameSelected = game;

      if (this.gameSelected.comments) {
        for (let review of this.gameSelected.reviews) {
          if (review.enduser.username === this.username) {
            this.filteredReviews.push(review);
          }
        }
      }

      console.log(this.gameSelected);
      console.log(this.gameSelected.reviews);
    });
  }

  backToGames(){
    this.isGameSelected=false;
    console.log(this.gameSelected)
  }

}
