import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../auth.service";
import { RegisterRequest } from "../interfaces/RegisterRequest";

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

  constructor(private authService: AuthService) {

    this.registerRequest={
      firstname:'',
      lastname:'',
      email:'',
      password: ''
    }

  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

  }


  register() {
    this.registerRequest.firstname = this.registerForm.get('firstname').value;
    this.registerRequest.lastname = this.registerForm.get('lastname').value;
    this.registerRequest.email = this.registerForm.get('email').value;
    this.registerRequest.password = this.registerForm.get('password').value;

    this.authService.register(this.registerRequest)
      .subscribe(data =>{
        alert(data);
      });
  }
}
