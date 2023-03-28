import { Component, Input, OnInit } from '@angular/core';
import { ProfilDTO } from '../interfaces/profil-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import {Game} from "../interfaces/game";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: string | any;
  profile!: ProfilDTO;
  userRole = 'a';
  isAdmin?: boolean;
  isInProfil: boolean=true;
  isInComments: boolean=false;
  isInReview: boolean=false;
  isInUserList: boolean=false;

  games? : Game[];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private  http:HttpClient
  ) {}

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

  }

  handleGoToProfilInfoClicked() {
    this.isInProfil = true;
    this.isInComments = false;
    this.isInReview = false;
    this.isInUserList=false;
  }

  handleGoToCommentsClicked() {
    this.isInProfil = false;
    this.isInComments = true;
    this.isInReview = false;
    this.isInUserList=false;
  }

  handleGoToReviewsClicked() {
    this.isInProfil = false;
    this.isInComments = false;
    this.isInReview = true;
    this.isInUserList=false;
  }

  handleGetUserListClicked() {
    this.router.navigate(['api', 'users', this.username, 'listOfUsers']);
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
