import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { BehaviorSubject } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import {Game} from "../../interfaces/game";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit{
  @Input() comments: Comment[] = [];
  @Output() commentChange = new EventEmitter<boolean>();
  commentBeingEdited: Comment | null = null;
  editContent: string = '';
  @Input() username: string | undefined;
  @Input() games: Game[] = []; // add this line
  gameSelected?: Game;
  isGameSelected: boolean = false;
  constructor(
    private commentService: CommentService,
    private profileService: ProfileService // inject ProfileService
  ) {

  }

  deleteComment(comment: Comment): void {
    this.commentService.deleteComment(comment).subscribe(() => {
      this.comments = this.comments.filter(c => c.commentId !== comment.commentId);
      this.commentChange.emit();
      this.isGameSelected = false; // Reset the flag
    });
  }

  showEditForm(comment: Comment): void {
    this.commentBeingEdited = comment;
    this.editContent = comment.content;
  }

  submitEdit(comment: Comment): void {
    const newContent = this.editContent.trim();
    if (newContent === '') {
      return;
    }

    const updates = { content: newContent };

    this.commentService.updateComment(comment.commentId, updates).subscribe(updatedComment => {
      const index = this.comments.findIndex(c => c.commentId === updatedComment.commentId);
      if (index >= 0) {
        this.comments[index] = updatedComment;
        this.commentBeingEdited = null;
        this.editContent = '';
        location.reload();

        // refresh the comments array in the profile object
        this.profileService.getProfileByUsername(<string>this.username).subscribe((profile) => {
          this.commentChange.emit();
        });
      }
    });


  }

  cancelEdit(): void {
    this.commentBeingEdited = null;
    this.editContent = '';
  }

  selectGame(game: Game) {
    this.gameSelected=game;
    this.isGameSelected=true;
    console.log(this.gameSelected)
  }

  backToGames(){
    this.isGameSelected=false;
    console.log(this.gameSelected)
  }
  ngOnInit(): void {
    console.log(this.games)
  }
}
