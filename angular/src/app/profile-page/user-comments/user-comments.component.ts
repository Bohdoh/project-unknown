import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import {CommentService} from "../../services/comment.service";


@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent {
  @Input() comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  deleteComment(comment: Comment): void {
    this.commentService.deleteComment(comment).subscribe(() => {
      this.comments = this.comments.filter(c => c.commentId !== comment.commentId);
    });
  }
}
