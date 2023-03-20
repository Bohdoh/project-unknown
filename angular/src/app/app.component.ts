import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userEmail: string | null = null;
  userToken: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email');
    this.userToken = localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.userEmail !== null && this.userToken !== null;
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.userEmail = null;
    this.userToken = null;
    this.router.navigate(['/']);
  }
}
