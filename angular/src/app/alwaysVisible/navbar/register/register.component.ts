import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {RegisterRequest} from "../../../interfaces/RegisterRequest";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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
  isEmailEmpty: boolean = true;
  isEmptyUsername: boolean = true;
  isEmptyPassword: boolean = true;
  @Output() closeRegister = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<void>();
  @Output() showLogin = new EventEmitter<void>();


  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
  }

  checkEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isValidEmail = regex.test(this.registerRequest.email);
    if (this.registerRequest.email !== "") {
      if (regex.test(this.registerRequest.email)) {
        this.isEmailEmpty = false;
        this.isValidEmail = true;
      }
    } else {
      this.isEmailEmpty = true;
      this.isValidEmail = false;
    }
  }

  matchingPasswords() {
    return this.registerRequest.password === this.confirmPassword;
  }

  // checkPassword(){
  //   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
  //   this.isValidPassword = regex.test(this.registerRequest.password)
  //   if (this.matchingPasswords()){
  //     if (this.registerRequest.password!==""){
  //       if (regex.test(this.registerRequest.password)){
  //         this.isEmptyPassword=false;
  //         this.isValidPassword=true;
  //         this.isConfirmPasswordValid=true;
  //       }
  //     }else {
  //       this.isEmptyPassword=false;
  //       this.isValidPassword=false;
  //       this.isConfirmPasswordValid=true;
  //     }
  //   }else {
  //     this.isEmptyPassword=true;
  //     this.isValidPassword=false;
  //     this.isConfirmPasswordValid=false;
  //   }
  //
  //
  // }

  pwIsLengthValid(): boolean {
    return this.registerRequest.password.length >= 5;
  }

  pwHasUppercase(): boolean {
    return /[A-Z]/.test(this.registerRequest.password);
  }

  pwHasNumber(): boolean {
    return /\d/.test(this.registerRequest.password);
  }

  pwIsValid(): boolean {
    return this.pwHasUppercase() && this.pwHasNumber() && this.pwIsLengthValid();
  }

  checkUsername() {
    const regex = /^(?!null$)[a-zA-Z0-9-]+$/;
    this.isValidUsername = regex.test(this.registerRequest.username)
    if (this.registerRequest.username !== "") {
      if (regex.test(this.registerRequest.username)) {
        this.isEmptyUsername = false;
        this.isValidUsername = true;
      }
    } else {
      this.isEmptyUsername = true;
      this.isValidUsername = false;
    }
  }

  onSubmit() {
    if (!this.isValidUsername || !this.isValidEmail || !this.pwIsValid()) {
      this.toastr.error('Please fill in all required fields correctly', "", {positionClass: 'toast-top-center'});
      return;
    }

    this.authService.register(this.registerRequest).subscribe(
      data => {
        this.toastr.success('Registration successful', 'Success!', {
          positionClass: 'toast-top-center'
        });
        this.registerSuccess.emit();
        this.resetInputFields();

        //this.router.navigateByUrl('/login');
      },
      error => {
        this.toastr.error('Username or Email are already in use', 'Error!', {
          positionClass: 'toast-top-center'
        });
      }
    );
  }

  resetInputFields() {
    this.registerRequest = {
      username: '',
      email: '',
      password: ''
    };
  }
}
