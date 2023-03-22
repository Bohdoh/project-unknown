import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../interfaces/game";
import {Category} from "../interfaces/category";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Enduser} from "../interfaces/enduser";
import {CommentPost} from "../interfaces/comment-post";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit{

  gameId? : number;
  game?:Game;
  commentContent?: string;
  reviewContent?: string;
  showComment: boolean = true;
  showReview: boolean = false;
  isLoggedIn?: boolean;
  username: string|any;
  role?:string;
  commentForm: FormGroup | any;
  reviewForm: FormGroup | any;

  currentUser?:Enduser;


  constructor(private http:HttpClient,
              private gameService : GameService,
              private route:ActivatedRoute,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGameById(this.gameId).subscribe((game: Game) => {
      this.game = game;
    });
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.role.subscribe((data: string) => this.role = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
    this.role = this.authService.getRole();
    this.authService.getUserByUsername(this.username).subscribe((user: Enduser) => {
      this.currentUser = user});
    console.log(this.currentUser)
    console.log(this.username)
  }

  addComment(comment?: string,) {
    if(this.gameId && comment){
    let payload :CommentPost = {
      gameId:this.gameId,
      username:this.username,
      content:comment
    }
    this.http.post<CommentPost>("http://localhost:8080/api/comment",payload);
    }


  }


//  reviewRepository.save(new Review("Ich gebe dem spiel eine 5 von 5!", enduserRepository.getById(1), gameRepository.findByGameId(7) ));
  addReview() {

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

  deleteComment(commentId: number, newestTitle: any) {

  }
}
