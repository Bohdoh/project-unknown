import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Game} from "../../../interfaces/game";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})

export class GameCardComponent {
  @Input() game? : Game;
  @Input() changeGamesToBeShownByCat: ((categoryName: string) => void) | undefined;

  constructor(public datePipe : DatePipe) {
  }

  onSubmit(categoryId: number) {
    console.log("Submitted category ID:", categoryId);

  }


  formatDate(isoDateString: string): string {
    return <string>this.datePipe.transform(new Date(isoDateString), 'HH:mm dd.MM.yy');
  }
}
