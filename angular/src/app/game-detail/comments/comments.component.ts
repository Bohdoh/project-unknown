import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentPost} from "../../interfaces/comment-post";
import {switchMap} from "rxjs";
import {Game} from "../../interfaces/game";
import {Comment} from "../../interfaces/comment";
import {HttpClient} from "@angular/common/http";
import {GameService} from "../../services/game.service";
import {StringToEmojiService} from "../../services/string-to-emoji.service";
import {Enduser} from "../../interfaces/enduser";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() isLoggedIn?: boolean;
  @Input() gameId?: number;
  @Input() username: string | any;
  @Input() game?: Game;
  @Input() role?: string;
  @Input() currentUser?: Enduser;
  @Output() gameChange = new EventEmitter<Game>();
  commentContent?: string;
  editCommentContent: string = "";
  commentIdBeingEdited: number = 0;

  constructor(private http:HttpClient,private gameService:GameService,private emojiService:StringToEmojiService) {
  }

  addComment(ident:string,comment ?: string) {
    if (this.gameId && comment) {
      let payload: CommentPost = {
        gameId: this.gameId,
        username: this.username,
        content: comment,
        commentId: this.commentIdBeingEdited

      }
      this.http.post<CommentPost>("http://localhost:8080/api/comment", payload)
        .pipe(
          switchMap(() => this.gameService.getGameById(Number(this.gameId)))
        )
        .subscribe((game: Game) => {
          this.game = game;
          this.commentIdBeingEdited = 0;
          this.gameChange.emit(this.game);
        });
    }
    if(ident === "write") {
      this.commentContent = undefined;
    }
  }

  deleteComment(comment: Comment) {
    this.http.post<number>('http://localhost:8080/api/comments/delete', comment.commentId).pipe(
      switchMap(() => this.gameService.getGameById(Number(this.gameId)))
    ).subscribe((game: Game) => {
      this.game = game;
      this.gameChange.emit(this.game);
    });
  }

  emojiConvertComment(ident:string,text ?: string) {
    if (text) {
      const words = text.split(' ');
      const emojiWords = words.map((word) => {
        return this.emojiService.emojiConvert(word);
      });
      ident === 'edit' ? this.editCommentContent = emojiWords.join(' '): this.commentContent = emojiWords.join(' ');
    }
  }

  canDeleteComment(comment: Comment) {
    return comment.enduser.username === this.username || this.role === "ADMIN"
  }


  canEditComment(comment: Comment) {
    return comment.enduser.username === this.username || this.role === "ADMIN"
  }

  showEditFormForComments(comment: Comment): void {
    this.editCommentContent = comment.content;
    this.commentIdBeingEdited = comment.commentId;
  }



}
