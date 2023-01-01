import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: any = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    homeaddress: null,
    phone: null,
    password: null
  };
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void{}

  onSubmit(): void{
    const { firstname, lastname, username, email, homeaddress, phone, password } = this.form;
    this.authService.register(firstname, lastname, username, email, homeaddress, phone, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
