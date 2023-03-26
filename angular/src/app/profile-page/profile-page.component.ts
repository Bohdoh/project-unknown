import { Component, Input, OnInit } from '@angular/core';
import { ProfilDTO } from '../interfaces/profil-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

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

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParams['username'];

    this.profileService
      .getProfileByUsername(this.username)
      .subscribe(
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
  }

  handleGoToReviewsClicked() {
    this.isInProfil = false;
    this.isInComments = false;
    this.isInReview = true;
  }

  handleGetUserListClicked() {
    this.router.navigate(['api', 'users', this.username, 'listOfUsers']);
  }

}
