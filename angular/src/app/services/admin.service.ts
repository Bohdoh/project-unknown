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

  upgrade(username: string): Observable<any> {
    const url = `http://localhost:8080/api/upgrade/${username}`;
    return this.http.put(url, null);
  }

  downgrade(username: string): Observable<any> {
    const url = `http://localhost:8080/api/downgrade/${username}`;
    return this.http.put(url, null);
  }




}
