import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { RegisterRequest } from "../../../interfaces/RegisterRequest";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequest: RegisterRequest = {
    username: '',
    email: '',
    password: ''
  };

  confirmPassword: string = '';
  isValidPassword: boolean = false;
  isValidUsername: boolean = false;
  isValidEmail: boolean = false;
  isConfirmPasswordValid: boolean = false;
  isEmailEmpty:boolean=true;
  isEmptyUsername:boolean=true;
  isEmptyPassword:boolean=true;


  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {}

  checkEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isValidEmail = regex.test(this.registerRequest.email);
    if (this.registerRequest.email!==""){
     if (regex.test(this.registerRequest.email)){
       this.isEmailEmpty=false;
       this.isValidEmail=true;
     }
    }else {
      this.isEmailEmpty=true;
      this.isValidEmail=false;
    }
  }

  matchingPasswords(){
    return this.registerRequest.password === this.confirmPassword;
  }

  checkPassword(){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    this.isValidPassword = regex.test(this.registerRequest.password)
    if (this.matchingPasswords()){
      if (this.registerRequest.password!==""){
        if (regex.test(this.registerRequest.password)){
          this.isEmptyPassword=false;
          this.isValidPassword=true;
          this.isConfirmPasswordValid=true;
        }
      }else {
        this.isEmptyPassword=false;
        this.isValidPassword=false;
        this.isConfirmPasswordValid=true;
      }
    }else {
      this.isEmptyPassword=true;
      this.isValidPassword=false;
      this.isConfirmPasswordValid=false;
    }


  }

  checkUsername(){
    const regex= /^(?!null$)[a-zA-Z0-9-]+$/;
    this.isValidUsername = regex.test(this.registerRequest.username)
    if (this.registerRequest.username!==""){
      if (regex.test(this.registerRequest.username)){
        this.isEmptyUsername=false;
        this.isValidUsername=true;
      }
    }else {
      this.isEmptyUsername=true;
      this.isValidUsername=false;
    }
  }

  onSubmit() {
    if (!this.isValidUsername || !this.isValidEmail || !this.isValidPassword || !this.isConfirmPasswordValid) {
      this.toastr.error('Please fill in all required fields correctly');
      return;
    }

    this.authService.register(this.registerRequest).subscribe(
      data => {
        this.toastr.success('Registration successful');
        this.router.navigateByUrl('/login');
      },
      error => {
        this.toastr.error('Registration failed. Please try again');
      }
    );
  }

}
