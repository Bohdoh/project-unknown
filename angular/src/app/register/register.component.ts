import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator });

  }


  onSubmit() {
    if (this.registerForm.valid && !this.registerForm.hasError('passwordsNotMatch')) {
      const request: RegisterRequest = {
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.authService.register(request).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          console.log('Registration successful');
// Navigate to another page, for example, the main page
        },
        (error) => {
          console.error('Error during registration:', error);
        }
      );
    } else if (this.registerForm.hasError('passwordsNotMatch')) {
      console.error('Passwords do not match');
// Display the error message in the user interface if needed
    } else {
      console.error('Form is not valid');
    }
  }



}
