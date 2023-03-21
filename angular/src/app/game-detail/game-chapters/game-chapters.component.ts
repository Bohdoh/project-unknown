import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Chapter} from "../../interfaces/chapter";
import {ActivatedRoute} from "@angular/router";
import {Game} from "../../interfaces/game";

@Component({
  selector: 'app-game-chapters',
  templateUrl: './game-chapters.component.html',
  styleUrls: ['./game-chapters.component.css']
})
export class GameChaptersComponent implements OnInit {

  chapters?: Chapter[];
  currentChapter?: Chapter;
  gameId?: number;
  selectedPath?: string[];
  selectedPathLetter?: string;



  constructor(private gameService: GameService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getChaptersByGameId(this.gameId).subscribe(
      (chapters: Chapter[]) => {
        this.chapters = chapters;
        this.setCurrentChapByIdent("start");
      });
  }

  private setCurrentChapByIdent(ident: string) {
    if (this.chapters) {
      for (let chapter of this.chapters) {
        if (chapter.identifier === ident) {
          this.currentChapter = this.chapters[this.chapters?.indexOf(chapter)];
        }
      }
    }
  }

  selectPath(path: string): void {
    if (this.currentChapter) {
      switch (path) {
        case 'A':
          this.selectedPath = this.currentChapter.pathA;
          this.selectedPathLetter = "A";
          break;
        case 'B':
          this.selectedPath = this.currentChapter.pathB;
          this.selectedPathLetter = "B";
          break;
        case 'C':
          this.selectedPath = this.currentChapter.pathC;
          this.selectedPathLetter = "C";
          break;
        case 'start':
          this.nextChapter("start");
          break;
      }
    }
  }

  getSelectedPathText(): string {
    if (!this.selectedPath) return '';

    if (this.currentChapter) {
      switch (this.selectedPathLetter) {
        case 'A':
          return this.currentChapter.pathA[1];
        case 'B':
          return this.currentChapter.pathB[1];
        case 'C':
          return this.currentChapter.pathC[1];
        default:
          return '';
      }
    }
    return '';
  }

  nextChapter(nextIdent: string) {
    this.selectedPath = undefined;
    this.selectedPathLetter = undefined;
    this.setCurrentChapByIdent(nextIdent);
  }
}
