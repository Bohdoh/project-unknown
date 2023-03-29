import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfilDTO } from '../interfaces/profil-dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getProfileByUsername(username: string): Observable<ProfilDTO> {
    const url = `${this.baseUrl}/profil/${username}`;
    return this.http.get<ProfilDTO>(url);
  }




}
