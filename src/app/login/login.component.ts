import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(){}
}
