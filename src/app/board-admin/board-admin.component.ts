import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent {
  content?: string;
  constructor(private userService: UserService){}

  ngOnInit(): void{
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if(err.error){
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch (error) {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        }else{
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
