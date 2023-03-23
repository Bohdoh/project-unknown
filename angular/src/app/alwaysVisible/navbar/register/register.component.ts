import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { RegisterRequest } from "../../../interfaces/RegisterRequest";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {IfStmt} from "@angular/compiler";

function passwordValidation(formGroup: FormGroup, toastr: ToastrService): string | number {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('password2')?.value;

  if (passwordIsNotNull(password, toastr)) {
    if (passwordLength(password, toastr)) {
      return password === confirmPassword ? password : 1; // error code 1 for passwords not matching
    } else {
      return 2; // error code 2 for invalid length
    }
  } else {
    return 3; // error code 3 for empty password
  }
}


function passwordIsNotNull(password: string, toastr: ToastrService): boolean {
  if (password == null) {
    toastr.error("You must input a password😿",'Error',{positionClass:'toast-bottom-center'});
    return false;
  } else {
    return true;
  }
}

function passwordLength(password: string, toastr: ToastrService): boolean {
  if (password.length <= 16) {
    if (password.length >= 8) {
      return true;
    } else {
      toastr.error("Min length for passwords is 8😿",'Error',{positionClass:'toast-top-center'});
      return false;
    }
  } else {
    toastr.error("Max length for passwords is 16😿",'Error',{positionClass:'toast-top-center'});
    return false;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm : FormGroup | any;

  registerRequest: RegisterRequest;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {

    this.registerRequest={
      username:'',
      email:'',
      password: ''
    }

  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });

  }


  register() {
    const username = this.registerForm.get('username').value;
    const email = this.registerForm.get('email').value;

    if (!username) {
      this.toastr.error('Please enter a username', 'Error', { positionClass: 'toast-top-center' });
      return;
    }

    if (!email) {
      this.toastr.error('Please enter an email', 'Error', { positionClass: 'toast-top-center' });
      return;
    }

    this.registerRequest.username = username;
    this.registerRequest.email = email;

    const validationResult = passwordValidation(this.registerForm, this.toastr);

    if (typeof validationResult === 'string') {
      this.registerRequest.password = validationResult;

      this.authService.register(this.registerRequest)
        .subscribe(() => {
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        }, (error: any) => {
          if (error.error.message === 'User already exists') {
            this.toastr.error('A user with that email or username already exists', 'Error', { positionClass: 'toast-top-center' });
          } else {
            this.toastr.error('Registration failed', 'Error', { positionClass: 'toast-top-center' });
          }
        });
    } else {

      switch (validationResult) {
        case 1:
          this.toastr.error('Passwords do not match! 😿', 'Error', { positionClass: 'toast-top-center' });
          break;
        case 2:
          this.toastr.error('Invalid password length! 😿', 'Error', { positionClass: 'toast-top-center' });
          break;
        case 3:
          this.toastr.error('You must input a password! 😿', 'Error', { positionClass: 'toast-top-center' });
          break;
        default:
          this.toastr.error('An unknown error occurred! 😿', 'Error', { positionClass: 'toast-top-center' });
      }
    }
  }





}
