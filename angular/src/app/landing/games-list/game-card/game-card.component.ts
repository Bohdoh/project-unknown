import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../interfaces/game";
import {DatePipe} from "@angular/common";
import {GameService} from "../../../services/game.service";
import {AuthService} from "../../../services/auth.service";
import {RefreshService} from "../../../services/refresh.service";


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})

export class GameCardComponent implements OnInit {
  @Input() game?: Game;
  @Input() changeGamesToBeShownByCat: ((categoryName: string) => void) | undefined;
  @Input() changeGamesToBeShownByRating: ((order: string) => void) | undefined;
  role?: string;
  gameRating: number = 0;

  constructor(public datePipe: DatePipe,private gameService:GameService,private authService:AuthService,private refreshService:RefreshService) {
  }

  ngOnInit(): void {

    this.role = this.authService.getRole();
    this.gameRating = this.gameService.getGameRating(this.game);
  }

  onSubmit(categoryId: number) {
    console.log("Submitted category ID:", categoryId);

  }

  formatDate(isoDateString: string): string {
    return <string>this.datePipe.transform(new Date(isoDateString), 'HH:mm dd.MM.yy');
  }

  deleteGame(gameId: number):void {
    this.gameService.deleteGame(gameId);
    this.refreshService.triggerRefreshEvent();
  }

  getRating(game :Game):number{
    let result:number =0;
    for(let review of game.reviews){
      result += review.rating;
}
    return result / game.reviews.length;
}


}
