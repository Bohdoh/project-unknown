import {Component, OnInit} from '@angular/core';
import {Game} from "../interfaces/game";
import {GameService} from "../services/game.service";
import {CategoryService} from "../services/category.service";
import {Category} from "../interfaces/category";

@Component({
  selector: 'app-mainframe',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  games?: Game[];
  gamesToBeShown?: Game[];
  categories?: Category[];
  gamesAmount?: number;
  currentCategory: string = "";
  currentOrder: string = "";


  constructor(private gameService: GameService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games: Game[]) => {
      this.games = games;
      this.gamesToBeShown = [...this.games];
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
    let tempGames: Game[] = [];
    if (categoryName == "" && this.games) {
      this.gamesToBeShown = [...this.games];
      this.currentCategory = "";
      return;
    }
    if (this.games) {
      for (const game of this.games) {
        if (game.categories && game.categories.some(category => category.name === categoryName)) {
          tempGames.push(game);
        }
      }
    }
    this.gamesToBeShown = tempGames;
    this.currentCategory = categoryName;
  }
  public changeGamesToBeShownByRating = (order: string): void => {
    if (order === "" && this.games) {
      this.gamesToBeShown = [...this.games];
      this.currentOrder = "";
      return;
    }

    this.gamesToBeShown = this.gamesToBeShown?.sort((game1, game2) => {
      const avgRating1 = game1.reviews.length > 0 ? game1.reviews.reduce((acc, review) => acc + review.rating, 0) / game1.reviews.length : 0;
      const avgRating2 = game2.reviews.length > 0 ? game2.reviews.reduce((acc, review) => acc + review.rating, 0) / game2.reviews.length : 0;
      return order === "asc" ? avgRating1 - avgRating2 : avgRating2 - avgRating1;
    });
    this.currentOrder = order;
  }


}




