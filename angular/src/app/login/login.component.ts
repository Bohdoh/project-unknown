import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AuthenticationRequest} from "../interfaces/AuthenticationRequest";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const request: AuthenticationRequest = this.loginForm.value;
      this.authService.authenticate(request).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', request.email);
          this.authService.setAuthStatus(true); // Set auth status to true
          this.router.navigate(['/']); // Navigate to home page
        },
        (error) => {
          console.error('Authentication failed', error);
        }
      );
    }
  }

}
