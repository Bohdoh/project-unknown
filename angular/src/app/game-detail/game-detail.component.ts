import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../interfaces/game";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {TimerService} from "../services/timer.service";
import {AuthService} from "../services/auth.service";
import {Enduser} from "../interfaces/enduser";
import {RefreshService} from "../services/refresh.service";
import {MultiplayerService} from "../services/multiplayer.service";


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  gameId?: number;
  game?: Game;
  showComment: boolean = true;
  showReview: boolean = false;
  isLoggedIn?: boolean;
  username: string | any;
  role?: string;
  currentUser?: Enduser;
  userHasReview?: boolean;
  gameRating? :number = 0;
  hasMultiplayer:boolean = false;

  constructor(private http: HttpClient,
              private gameService: GameService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private timerService: TimerService,
              private refreshService:RefreshService,
              private multiplayerService:MultiplayerService
  ) {
    this.refreshService.refresh$.subscribe(() => {
      this.loadGames();
      this.loadUser();
    });
  }

  ngOnInit(): void {
    this.loadGames();
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.role.subscribe((data: string) => this.role = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
    this.role = this.authService.getRole();
    this.loadUser();
    this.hasMultiplayer = this.multiplayerService.isMultiplayer();
  }


  startGame() {
    this.timerService.startTimer();
  }

  switchCommentAndReviews(tabValue: string) {
    switch (tabValue) {
      case 'comments':
        this.showComment = true;
        this.showReview = false;
        break;
      case 'reviews':
        this.showComment = false;
        this.showReview = true;
        break;
    }
  }

  private loadGames() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGameById(this.gameId).subscribe((game: Game) => {
      this.game = game;
      this.gameRating = this.gameService.getGameRating(this.game);
    });
  }

  private loadUser() {
    this.authService.getUserByUsername(this.username).subscribe((user: Enduser) => {
      this.currentUser = user
    });
  }

  toggleMultiplayer() {
  this.multiplayerService.toggleMultiplayer();
  this.hasMultiplayer = this.multiplayerService.isMultiplayer();
  console.log("Status MP: " + this.hasMultiplayer);
  }
}
