import {Component, Input} from '@angular/core';
import {ProfilDTO} from "../../interfaces/profil-dto";

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent {
  @Input() username: string|any;
  @Input() profile: ProfilDTO | any;

}
