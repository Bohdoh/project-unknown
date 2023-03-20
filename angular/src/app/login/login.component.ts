import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AuthenticationRequest} from "../interfaces/AuthenticationRequest";
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup|any;

  loginRequest:AuthenticationRequest;


  isError: boolean|any;
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router, private activatedRoute : ActivatedRoute ) {

    this.loginRequest={
      email:'',
      password: ''
    }

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });


  }


  login() {

    this.loginRequest.email = this.loginForm.get('email').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.authenticate(this.loginRequest).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('/home');
      this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }
}
