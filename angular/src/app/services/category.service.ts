import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../interfaces/game";
import {Category} from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private gamesUrl = 'http://localhost:8081/api/categories';
  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.gamesUrl);
  }
}
