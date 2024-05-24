import { Component, OnInit, inject } from '@angular/core';
import { Legacy } from 'src/app/models/legacy.model';
import { Leveling } from 'src/app/models/leveling.model';
import { Mythic } from 'src/app/models/mythic.model';
import { Raid } from 'src/app/models/raid.model';
import { Strike } from 'src/app/models/strike.model';
import { User } from 'src/app/models/user.model';
import { LegacyService } from 'src/app/services/legacy.service';
import { LevelingService } from 'src/app/services/leveling.service';
import { MythicService } from 'src/app/services/mythic.service';
import { RaidService } from 'src/app/services/raid.service';
import { StrikeService } from 'src/app/services/strike.service';
import { UserService } from 'src/app/services/user.service';
import { HomeComponent } from '../home.component';

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
  onHoldUsers!: User[];
  mythics!: Mythic[];
  raids!: Raid[];
  legacies!: Legacy[];
  levelings!:Leveling[];
  strikes!: Strike[];

  home = inject(HomeComponent);
  userService = inject(UserService);
  mythicService = inject(MythicService);
  raidService = inject(RaidService);
  legacyService = inject(LegacyService);
  levelingService = inject(LevelingService);
  strikeService = inject(StrikeService);

  async ngOnInit(): Promise<void> {
    this.home.title = "Admin Menu";
    
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
    this.onHoldUsers = await this.userService.getUsersOnHold();

    this.mythics = await this.mythicService.getMythics();
    this.raids = await this.raidService.getRaids();
    this.legacies = await this.legacyService.getRaids();
    this.levelings = await this.levelingService.getLevelings();
    this.strikes = await this.strikeService.getStrikes();

    setTimeout(() => {
      this.loader = true;
    }, 1500);
    
  }

  changeView(view: string) {
    this.view = view;
  }

}
