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
    this.stars = Array.from({length: 5}, (_, i) => {
      const ratingDiff = this.gameRating - i;
      if (ratingDiff >= 1) return 'fa-star';
      if (ratingDiff > 0) return 'fa-star-half-o';
      return 'fa-star-o';
    });
  }

}
