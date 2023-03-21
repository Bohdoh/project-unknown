import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit{

  //faUser = faUser;
  isLoggedIn: boolean | undefined;
  email: string|any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.email.subscribe((data: string) => this.email = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.email = this.authService.getEmail();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.email);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

}
