import {Component, Input} from '@angular/core';
import {ProfilDTO} from "../../interfaces/profil-dto";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent {
  @Input() profile: ProfilDTO | any;


}
