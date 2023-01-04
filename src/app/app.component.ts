import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { UserClass } from './models/user-class.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Fishery Segmentation Fault';
  private roles: string[] = [];
  isLoggedIn: boolean = false;
  showAdminBoard: boolean = false;
  showModeratorBoard: boolean = false;
  username: string = '';
  user: UserClass = new UserClass();
  eventBusSub?: Subscription;
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ){}

  ngOnInit(): void{
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      this.user = this.storageService.getUser();
      this.roles = this.user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = this.user.username;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }
  logout(): void{
    this.authService.logout().subscribe({
      next: res =>{
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
