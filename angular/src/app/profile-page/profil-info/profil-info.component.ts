import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfilDTO } from '../../interfaces/profil-dto';
import { ProfileService } from '../../services/profile.service';
import {LocalStorageService} from "ngx-webstorage";
import {Review} from "../../interfaces/review";
import {Comment} from "../../interfaces/comment";

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.css']
})
export class ProfilInfoComponent implements OnInit {
  @Input() profile: ProfilDTO | any;
  @Input() username: string |any;

  comments:Comment[]=[];
  reviews:Review[]=[];

  @Output() goToReviewsClicked = new EventEmitter();
  @Output() goToCommentsClicked = new EventEmitter();
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
    } else {
      this.isAdmin=false;
    };

    this.profile.comments.forEach((comment: Comment) => {
      const filteredComment = this.comments.filter(c => c.content === comment.content)[0];
      if (!filteredComment) {
        this.comments.push(comment);
      }
    });

    this.profile.reviews.forEach((review: Review) => {
      const filteredReview = this.reviews.filter(r => r.content === review.content)[0];
      if (!filteredReview) {
        this.reviews.push(review);
      }
    });





    console.log(this.profile);
  }

  goToReviews() {
    this.goToReviewsClicked.emit();
  }

  goToComments() {
    this.goToCommentsClicked.emit();
  }

}
