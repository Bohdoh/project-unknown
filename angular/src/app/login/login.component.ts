import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AuthenticationRequest} from "../interfaces/AuthenticationRequest";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup|any;

  loginRequest:AuthenticationRequest;

  constructor(private authService: AuthService, ) {

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

    this.authService.authenticate(this.loginRequest)
      .subscribe(data =>{
        alert('Log in successful');
      });
  }
}
