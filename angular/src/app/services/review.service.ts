import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  deleteReview(id: number): Observable<void> {
    const url = `${this.API_URL}/reviews/delete`;
    return this.http.post<void>(url, id);
  }
}
