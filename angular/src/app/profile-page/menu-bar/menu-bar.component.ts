import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ProfilDTO} from "../../interfaces/profil-dto";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit{

  @Output() goToProfilInfoClicked = new EventEmitter();
  @Output() goToReviewsClicked = new EventEmitter();
  @Output() goToCommentsClicked = new EventEmitter();
  @Output() getUserListClicked = new EventEmitter();

  userRole:string="user";
  @Input() isAdmin?:boolean;


  constructor(private router: Router) {
  }
  ngOnInit(): void {



  }

  goToProfilInfo() {
    this.goToProfilInfoClicked.emit();
  }

  goToReviews() {
    this.goToReviewsClicked.emit();
  }

  goToComments() {
    this.goToCommentsClicked.emit();
  }

  getUserList() {
    this.getUserListClicked.emit();
  }

}
