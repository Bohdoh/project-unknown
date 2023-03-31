import { Component,  OnInit } from '@angular/core';
import { ProfilDTO } from '../interfaces/profil-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import {Game} from "../interfaces/game";
import {HttpClient} from "@angular/common/http";
import {Review} from "../interfaces/review";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: string ='';
  profile!: ProfilDTO;
  userRole = 'a';
  isAdmin?: boolean;
  isInProfil: boolean = true;
  isInComments: boolean = false;
  isInReview: boolean = false;
  isInUserList: boolean = false;



  games: Game[]=[];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private http: HttpClient
  ) {
    this.username = '';
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParams['username'];
    this.http.get<Game[]>("http://localhost:8080/api/games").subscribe(
      games => {
        this.games = games
      }
    )
    this.profileService.getProfileByUsername(this.username).subscribe(
      (data) => {
        this.profile = data;
        this.userRole = this.profile.role;
        this.isAdmin = this.userRole === 'ADMIN';
      },
      (error) => {
        console.error(error);
      }
    );

    console.log(this.username);
console.log(this.profile);
  }

  handleGoToProfilInfoClicked() {
    this.isInProfil = true;
    this.isInComments = false;
    this.isInReview = false;
    this.isInUserList = false;
    console.log(this.profile);
  }

  handleGoToCommentsClicked() {
    this.isInProfil = false;
    this.isInComments = true;
    this.isInReview = false;
    this.isInUserList = false;
    console.log(this.profile);
  }

  handleGoToReviewsClicked() {
    this.isInProfil = false;
    this.isInComments = false;
    this.isInReview = true;
    this.isInUserList = false;
    console.log(this.profile);
  }

  handleGetUserListClicked() {
    this.isInUserList = true;
    this.isInProfil = false;
    this.isInComments = false;
    this.isInReview = false;
  }

  updateComment() {
    this.profileService.getProfileByUsername(this.username).subscribe(
      (data) => {
        this.profile = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
