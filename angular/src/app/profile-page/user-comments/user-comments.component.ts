import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent {
  @Input() comments: Comment[] = [];

  commentBeingEdited: Comment | null = null;
  editContent: string = '';

  constructor(private commentService: CommentService) {}

  deleteComment(comment: Comment): void {
    this.commentService.deleteComment(comment).subscribe(() => {
      this.comments = this.comments.filter(c => c.commentId !== comment.commentId);
    });
  }

  showEditForm(comment: Comment): void {
    this.commentBeingEdited = comment;
    this.editContent = comment.content;
  }
/*submitEdit(comment: Comment): void {
    const newContent = this.editContent.trim();
    if (newContent === '') {
      return;
    }
    this.commentService.updateComment({ ...comment, content: newContent }).subscribe(updatedComment => {
      const index = this.comments.findIndex(c => c.commentId === updatedComment.commentId);
      if (index >= 0) {
        this.comments[index] = updatedComment;
      }
      this.cancelEdit();
    });
  }
* */


  cancelEdit(): void {
    this.commentBeingEdited = null;
    this.editContent = '';
  }
}
