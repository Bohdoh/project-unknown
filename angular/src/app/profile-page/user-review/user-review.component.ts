import {Component, Input} from '@angular/core';
import {ProfilDTO} from "../../interfaces/profil-dto";
import {Comment} from "../../interfaces/comment";
import {Review} from "../../interfaces/review";
import {ReviewService} from "../../services/review.service";
import {Game} from "../../interfaces/game";

//
@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent {
  @Input() reviews: Review[] = [];
  @Input() username: string | undefined;
  isGameSelected:boolean=false;
  @Input() games:Game[];
  gameSelected?:Game;
  constructor(private reviewService: ReviewService) {}

  deleteReview(review: Review): void {
    this.reviewService.deleteReview(review.id).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.id !== review.id);
    });
  }


}
