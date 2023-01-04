import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserClass } from '../models/user-class.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit{
  currentUser!: UserClass;
  constructor(private storageService: StorageService){}

  ngOnInit(): void{
    this.currentUser = this.storageService.getUser();
  }
}
