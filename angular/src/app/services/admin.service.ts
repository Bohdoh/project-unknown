import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enduser} from "../interfaces/enduser";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }

  getUsers(username: string): Observable<Enduser[]> {
    const url = `${this.baseUrl}/${username}/listOfUsers`;
    return this.http.get<Enduser[]>(url);
  }
}
