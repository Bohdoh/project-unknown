import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AuthenticationRequest } from '../../../interfaces/AuthenticationRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import {RefreshService} from "../../../services/refresh.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  loginRequest: AuthenticationRequest;

  isError: boolean | any;
  @Output() closeLogin = new EventEmitter<void>();
  @Output() showRegister = new EventEmitter<void>();




  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,// added form builder dependency
    private refreshService: RefreshService
  ) {

    this.loginRequest = {
      username: '',
      password: ''
    }

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {

    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.authenticate(this.loginRequest).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('/home');
      this.toastr.success('Login Successful','Success', {
        positionClass: 'toast-top-center'
      });
      this.closeLogin.emit();
      this.refreshService.triggerRefreshEvent();

    }, error => {
      this.isError = true;
      throwError(error);
      this.toastr.error('Username or Password are not right! 🤔 ','Error! 🪳', {
        positionClass: 'toast-top-center'
      });
    });
  }
}
