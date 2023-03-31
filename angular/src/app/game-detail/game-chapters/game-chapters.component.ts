import {Component, NgZone, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Chapter} from "../../interfaces/chapter";
import {ActivatedRoute} from "@angular/router";
import {TimerService} from "../../services/timer.service";
import {MultiplayerService} from "../../services/multiplayer.service";

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
  hasMultiplayer: boolean = false;
  votingA: number = 0;
  votingB: number = 0;
  votingC: number = 0;
  totalVotes: number = 0;
   gameRoom = "txt_adv_codeforge";
  //gameRoom = "voting";
  timerStarted: boolean = false;
  nextVotes: number = 0;
  timeLeft: number = 0;

  private eventSource?: EventSource;


  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private timerService: TimerService,
    private multiplayerService: MultiplayerService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    if(this.hasMultiplayer){
      this.startMultiplayer();
    }
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getChaptersByGameId(this.gameId).subscribe(
      (chapters: Chapter[]) => {
        this.chapters = chapters;
        this.setCurrentChapByIdent("start");
      });
    this.hasMultiplayer = this.multiplayerService.isMultiplayer();
    this.sumVotes();
  }

  ngOnDestroy(): void {
    this.eventSource?.close();
  }

  private sumVotes() {
    this.totalVotes = this.votingA + this.votingB + this.votingC;
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
      this.timerStarted = false;
      this.timeLeft = 0;
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
    console.log("NextChapter()");
    this.selectedPath = undefined;
    this.selectedPathLetter = undefined;
    this.timerStarted = false;
    this.timeLeft = 0;
    console.log("Timer stopped and timeleft = 0!");
    this.setCurrentChapByIdent(nextIdent);
    if(nextIdent !== 'gameover' && nextIdent !== 'won') {
      this.votingA = 0;
      this.votingB = 0;
      this.votingC = 0;
      this.nextVotes = 0;
      this.totalVotes = 0;
      setTimeout( () => {
        this.restartVoting();
      }, 10000);

    }
  }


  private restartVoting() {
    if (this.hasMultiplayer) {
      this.multiplayerService.sendQuestion(this.gameRoom, this.currentChapter);
    }
  }

  startGame() {
    //this.timerService.startTimer();

  }

  resetTimer() {
    // this.timerService.resetTimer();

  }

  toggleMultiplayer() {
    this.multiplayerService.toggleMultiplayer();
    this.startMultiplayer();
  }

  private startMultiplayer() {
    this.hasMultiplayer = this.multiplayerService.isMultiplayer();
    console.log("Status MP: " + this.hasMultiplayer);
    if (this.hasMultiplayer) {
      this.multiplayerService.sendQuestion(this.gameRoom, this.currentChapter);
      this.initEventSource();
    } else {
      // Close the EventSource connection when multiplayer is toggled off
      if (this.eventSource) {
        this.eventSource.close();
      }
    }
  }

  private initEventSource(): void {
    if (this.gameRoom && this.hasMultiplayer) {
      const url = `https://ntfy.sh/${this.gameRoom}_poll_topic/sse`;
      this.eventSource = new EventSource(url);
      this.eventSource.onmessage = (eventWrapper) => {
        this.ngZone.run(() => {
          const actualEvent = JSON.parse(eventWrapper.data);
          const decodedMessage = atob(actualEvent.message);
          const voteData = JSON.parse(decodedMessage);

          if (voteData.event === 'poll_event') {
            if (voteData.voteType === 'next') {
              this.nextVotes += 1;
              console.log("Next Votes: " + this.nextVotes + ". Total Votes: " + this.totalVotes);
              if (this.nextVotes >= this.totalVotes) {
                console.log("Everyone clicked next!");
                if (this.selectedPath) {
                  this.nextChapter(this.selectedPath[2]);
                }
              }
            } else {
              this.votingA += voteData.voting[0];
              this.votingB += voteData.voting[1];
              this.votingC += voteData.voting[2];
              this.sumVotes();
              console.log("Vote received!");
              if (!this.timerStarted) {
                this.timerStarted = true;
                console.log("Timer started!");
                this.timeLeft = 100;
                const timerInterval = setInterval(() => {
                  this.timeLeft -= 1;
                  if (this.timeLeft <= 0) {
                    clearInterval(timerInterval);
                    this.handleAutomaticSelection();
                  }
                }, 100); // Update every 100ms (10 seconds / 100)
              }
            }
          }
        });
      };
    }
  }


  private handleAutomaticSelection(): void {

    if(this.totalVotes === 0){
      return;
    }
    // Find the choice with the most votes
    const choices = [this.votingA, this.votingB, this.votingC];
    const maxVotesIndex = choices.indexOf(Math.max(...choices));

    // Choose the appropriate method based on the choice with the most votes
    switch (maxVotesIndex) {
      case 0:
        this.selectPath('A');
        break;
      case 1:
        this.selectPath('B');
        break;
      case 2:
        this.selectPath('C');
        break;
      default:
        console.error('Error: No choice selected.');
    }
    // Reset the timerStarted variable
    this.timerStarted = false;
    if(this.nextVotes >= 1){
      if(this.selectedPath)
      this.nextChapter(this.selectedPath[2]);
    }else{
      this.sendNextQuestion();
    }
  }
  private sendNextQuestion(): void {
    if (this.currentChapter) {
      const nextQuestion = {
        ...this.currentChapter,
        pathA: ['next', 'Next'],
        pathB: [""],
        pathC: [""],
      };
      this.multiplayerService.sendQuestion(this.gameRoom, nextQuestion);
    }
  }

  shouldBeHighlighted(path: string): boolean {
    const choices = [this.votingA, this.votingB, this.votingC];
    const maxVotesIndex = choices.indexOf(Math.max(...choices));

    if (path === 'A' && maxVotesIndex === 0 && this.totalVotes > 0) {
      return true;
    }
    if (path === 'B' && maxVotesIndex === 1 && this.totalVotes > 0) {
      return true;
    }
    if (path === 'C' && maxVotesIndex === 2 && this.totalVotes > 0) {
      return true;
    }
    return false;
  }

  resetVotesAndTimer(){
    this.totalVotes = 0;
    // this.votingC = 0;
    // this.votingA = 0;
    // this.votingB = 0;
    this.timerStarted = false;
    this.timeLeft = 0;
    this.nextVotes = 0;
  }
}
