import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../auth.service";
import { RegisterRequest } from "../interfaces/RegisterRequest";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

function passwordMatchValidator(formGroup: FormGroup): null | { passwordsNotMatch: boolean } {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordsNotMatch: true };
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
      password: new FormControl('', Validators.required)
    });

  }


  register() {
    this.registerRequest.username = this.registerForm.get('username').value;
    this.registerRequest.email = this.registerForm.get('email').value;
    this.registerRequest.password = this.registerForm.get('password').value;

    this.authService.register(this.registerRequest)
      .subscribe(() =>{
        this.router.navigate(['/login'], {queryParams:{registered:true}});
      },()=>{
        this.toastr.error('Registration Failed! 🌶️')
      });
  }
}
