import {Component, Input} from '@angular/core';
import {ProfilDTO} from "../../interfaces/profil-dto";
import {Comment} from "../../interfaces/comment";
import {switchMap} from "rxjs";
import {Game} from "../../interfaces/game";
import {HttpClient} from "@angular/common/http";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent {
  @Input() profile: ProfilDTO | any;

  constructor(private http:HttpClient,private gameService:GameService) {
  }


   deleteComment(comment: Comment) {
    this.http.post<number>('http://localhost:8080/api/comments/delete', comment.commentId);
    };
  }




