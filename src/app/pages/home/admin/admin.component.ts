import { Component, OnInit, inject } from '@angular/core';
import { Mythic } from 'src/app/models/mythic.model';
import { User } from 'src/app/models/user.model';
import { MythicService } from 'src/app/services/mythic.service';
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
  mythics!: Mythic[];

  userService = inject(UserService);
  mythicService = inject(MythicService);

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
    ];

    this.users = await this.userService.getUsers();

    this.mythics = await this.mythicService.getMythics();

    setTimeout(() => {
      this.loader = true;
    }, 1500);
    
  }

  changeView(view: string) {
    this.view = view;
  }

}
