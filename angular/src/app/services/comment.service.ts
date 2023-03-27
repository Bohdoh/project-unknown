import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  deleteComment(comment: Comment): Observable<void> {
    const url = `${this.API_URL}/comments/delete`;
    return this.http.post<void>(url, comment.commentId);
  }

  updateComment(comment: Comment): Observable<void> {
    const url = `${this.API_URL}/comments/update`;
    return this.http.put<void>(url, comment);
  }
}
