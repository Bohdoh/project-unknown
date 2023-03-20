import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../interfaces/game";
import {GameService} from "../services/game.service";
import {CategoryService} from "../services/category.service";
import {Category} from "../interfaces/category";

@Component({
  selector: 'app-mainframe',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{

  games? : Game[];
  gamesToBeShown? : Game[];
  categories? : Category[];
  gamesAmount?: number;


  constructor(private gameService : GameService,private categoryService : CategoryService) {
  }

  ngOnInit():void {
    this.gameService.getGames().subscribe((games: Game[]) => {
      this.games = games;
      this.gamesToBeShown = games;
      this.gamesAmount = this.games?.length;
    });
    this.categoryService.getCategories().subscribe((category: Category[]) => {
      this.categories = category;
    });

  }

  public getNumberOfPostsWithCat(categoryName: string): number {
    let count = 0;
    if (this.games) {
      for (const game of this.games) {
        if (game.categories && game.categories.some(category => category.name === categoryName)) {
          count++;
        }
      }
    }
    return count;
  }

  public changeGamesToBeShownByCat = (categoryName: string): void => {
    let tempGames : Game[] = [];
    if(categoryName == ""){
      this.gamesToBeShown = this.games;
      return;
    }
    if(this.games){
      for(const game of this.games){
        if(game.categories && game.categories.some(category => category.name === categoryName)){
          tempGames.push(game);
        }
      }
    }
    this.gamesToBeShown = tempGames;
  }

}
