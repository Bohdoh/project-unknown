import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImageReceived} from "../interfaces/image-received";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) {
  }

  getImage(title : string):Observable<ImageReceived>{
    return this.http.get<ImageReceived>('http://localhost:8080/api/images/'+title);
  }


}
