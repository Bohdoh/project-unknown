import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Enduser} from "../../interfaces/enduser";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {TimerService} from "../../services/timer.service";
import {tap} from "rxjs";
import {RefreshService} from "../../services/refresh.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit{
  isLoggedIn: boolean | undefined;
  username: string|any;
  role?:string;
  selectedImage?: File;
  enduser?:Enduser;
  fileInput: any;
  timerValue: number=60;
  isPlaying: boolean = false;
  constructor(
    private authService: AuthService,
    private timerService: TimerService,
    private router: Router,
    private http:HttpClient,
    private localStorage: LocalStorageService,
    private refreshService: RefreshService
  ) {
    this.refreshService.refresh$.subscribe(() => {
      this.refreshNavbar();
    });
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.role.subscribe((data: string) => this.role = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
    this.role = this.authService.getRole();
    if(this.isLoggedIn) {
      this.authService.getUserByUsername(this.username).subscribe((user: Enduser) => {
        this.enduser = user;
      });
      this.timerService.timer$.subscribe((value: number) => {
        this.timerValue = value;
      });
      this.timerService.isPlaying$.subscribe((value: boolean) => {
        this.isPlaying = value;
      });
    }
  }

  goToUserProfile() {
    const navigationExtras = {
      state: {
        enduser: this.enduser
      },
      queryParams: {
        username: this.username
      }
    };
    this.router.navigate(['/profile'], navigationExtras);
  }


  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
    this.enduser = undefined;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    const formData = new FormData();
    if(this.selectedImage){
    formData.append('file', this.selectedImage);}
    this.http.post(
      "http://localhost:8080/api/users/" + this.username + "/image",
      formData
    ).pipe(
      tap(() => {
        this.authService.getUserByUsername(this.username).subscribe((user: Enduser) => {
          this.enduser = user;
        });
      })
    ).subscribe((response) => {
      console.log(response);
    });
  }
  refreshNavbar() {
    this.authService.getUserByUsername(this.username).subscribe((user: Enduser) => {
      this.enduser = user;
    });
  }
}
