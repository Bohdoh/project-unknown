import {Component, Input, OnInit} from '@angular/core';
import {ProfilDTO} from "../interfaces/profil-dto";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../services/profile.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  @Input() username: string|any;
  profile!: ProfilDTO;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {

  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
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
