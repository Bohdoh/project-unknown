import {Component, Input} from '@angular/core';
import {Game} from "../../interfaces/game";





@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})


export class GamesListComponent {

   @Input() games? : Game[];
   @Input() changeGamesToBeShownByCat: ((categoryName: string) => void) | undefined;
   @Input() changeGamesToBeShownByRating: ((order: string) => void) | undefined;




}
