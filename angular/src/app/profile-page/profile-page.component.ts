import {Component, Input, OnInit} from '@angular/core';
import {ProfilDTO} from "../interfaces/profil-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../services/profile.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  @Input() username: string|any;
  profile!: ProfilDTO;
  userRole:string="a";
  isAdmin?:boolean;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.profileService.getProfileByUsername(this.username).subscribe(
      (data) => {
        this.profile = data;
        this.userRole=this.profile.role;
        this.isAdmin=this.userRole==="ADMIN";
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUserList() {
    this.router.navigate(['api', 'users', this.username, 'listOfUsers']);
  }

}
