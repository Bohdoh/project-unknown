import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../interfaces/game";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})

export class GameCardComponent implements OnInit {
  @Input() game?: Game;
  @Input() changeGamesToBeShownByCat: ((categoryName: string) => void) | undefined;
  @Input() changeGamesToBeShownByRating: ((order: string) => void) | undefined;
  gameRating: number = 0;
  stars: string[] = [];

  constructor(public datePipe: DatePipe) {
  }

  ngOnInit(): void {
    if (this.game && this.game.reviews) {
      for (let i = 0; i < this.game.reviews.length; i++) {
        this.gameRating += this.game.reviews[i].rating;
      }
      this.gameRating = this.gameRating / this.game.reviews.length;
      this.generateStars();
    }
  }

  onSubmit(categoryId: number) {
    console.log("Submitted category ID:", categoryId);

  }

  formatDate(isoDateString: string): string {
    return <string>this.datePipe.transform(new Date(isoDateString), 'HH:mm dd.MM.yy');
  }

  generateStars(): void {
    const fullStarIcon = 'fa-star';
    const halfStarIcon = 'fa-star-half-o';
    const emptyStarIcon = 'fa-star-o';

    const maxStars = 5;
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
      const ratingDiff = this.gameRating - i;
      if (ratingDiff >= 1) {
        stars.push(fullStarIcon);
      } else if (ratingDiff > 0) {
        stars.push(halfStarIcon);
      } else {
        stars.push(emptyStarIcon);
      }
    }
    this.stars = stars;
  }
}
