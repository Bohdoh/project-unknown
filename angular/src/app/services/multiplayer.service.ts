import {Injectable, NgZone} from '@angular/core';
import {Chapter} from "../interfaces/chapter";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {RefreshService} from "./refresh.service";

interface Questions {
  event: string,
  questions: string | string[] // base64 encoding
}

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  private hasMultiplayer: boolean = false;

  constructor(private zone: NgZone, private http: HttpClient,
              private refreshService : RefreshService) {
  }


  toggleMultiplayer() {
    this.hasMultiplayer = !this.hasMultiplayer;
  }

  isMultiplayer(): boolean {
    return this.hasMultiplayer;
  }

  sendQuestion(groupName: string, currentChapter: Chapter | undefined) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let pathChoices: string[] = [];
    let message = {
      event: "question_event",
      questions: pathChoices,
      darkmode:this.refreshService.getDarkmode()
    };

    if (currentChapter?.pathA) {
      pathChoices.push(currentChapter?.pathA[0]);
    }
    if (currentChapter?.pathB) {
      pathChoices.push(currentChapter?.pathB[0]);
    }
    if (currentChapter?.pathC) {
      pathChoices.push(currentChapter?.pathC[0]);
    }
    console.log("Message: " + message);

    const payload = {
      topic: groupName + '_question_topic',
      message: this.encodeMessageToBase64(message), // Use 'message' instead of 'questions'
      title: 'New question with choices',
      tags: [],
      attach: '',
    };
    console.log("Payload: " + payload.message);
    this.http.post("https://ntfy.sh",payload, {headers}).subscribe(
    (result) => {
      console.log('Question sent:', result);
    },
    (error) => {
      console.error('Error:', error);
    })
  }

  encodeMessageToBase64(message: { questions: string[]; event: string }): string {
     return btoa(JSON.stringify(message));
  }
}
