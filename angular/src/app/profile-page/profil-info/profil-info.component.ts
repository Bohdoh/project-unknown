import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfilDTO } from '../../interfaces/profil-dto';
import { ProfileService } from '../../services/profile.service';
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.css']
})
export class ProfilInfoComponent implements OnInit {
  @Input() profile: ProfilDTO | any;
  @Input() username: string |any;

  userRole:string="a";
  isAdmin?:boolean;
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private storage:LocalStorageService
  ) {

    this.route.params.subscribe(params => {
      this.username = +params['username'];
    });

  }

  ngOnInit(): void {
if (this.profile.role==="ADMIN"){
  this.isAdmin=true;
}else {
  this.isAdmin=false;
}

console.log(this.profile.role)
  }
}
