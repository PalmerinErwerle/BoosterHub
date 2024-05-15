import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loader = false;
  
  buttons!: any[];
  view = "user";

  users!: User[];

  userService = inject(UserService);

  async ngOnInit(): Promise<void> {
    
    this.buttons = [
      {
        title: 'Users',
        view: 'user'
      },
      {
        title: 'Mythic +',
        view: 'mythic'
      },
      {
        title: 'Raids',
        view: 'raid'
      },
      {
        title: 'Legacy Raids',
        view: 'legacy'
      },
      {
        title: 'Leveling',
        view: 'leveling'
      },
      {
        title: 'Strikes',
        view: 'strike'
      },
    ]

    this.users = await this.userService.getUsers();

    setTimeout(() => {
      this.loader = true;
    }, 1500);
    
  }

  changeView(view: string) {
    this.view = view;
  }

}
