import { Component, OnInit, inject } from '@angular/core';
import { Legacy } from 'src/app/models/legacy.model';
import { Leveling } from 'src/app/models/leveling.model';
import { Mythic } from 'src/app/models/mythic.model';
import { Raid } from 'src/app/models/raid.model';
import { Strike } from 'src/app/models/strike.model';
import { LegacyService } from 'src/app/services/legacy.service';
import { LevelingService } from 'src/app/services/leveling.service';
import { MythicService } from 'src/app/services/mythic.service';
import { RaidService } from 'src/app/services/raid.service';
import { StrikeService } from 'src/app/services/strike.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styleUrls: ['./booster.component.scss']
})
export class BoosterComponent implements OnInit {

  loader = false;

  uid!: string;
  buttons!: any[];
  view = "general";
  
  mythics!: Mythic[];
  raids!: Raid[];
  legacies!: Legacy[];
  levelings!:Leveling[];
  strikes!: Strike[];

  home = inject(HomeComponent);
  utilsService = inject(UtilsService);
  mythicService = inject(MythicService);
  raidService = inject(RaidService);
  legacyService = inject(LegacyService);
  levelingService = inject(LevelingService);
  strikeService = inject(StrikeService);

  async ngOnInit() {
    this.home.title = "Booster Menu";

    this.uid = await this.utilsService.getUserUid();
    
    this.buttons = [
      {
        title: 'General',
        view: 'general'
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

    this.mythics = await this.mythicService.getMythicsByBooster(this.uid);
    this.raids = await this.raidService.getRaidsByBooster(this.uid);
    this.legacies = await this.legacyService.getRaidsByBooster(this.uid);
    this.levelings = await this.levelingService.getLevelingsByBooster(this.uid);
    this.strikes = await this.strikeService.getStrikesByStriked(this.uid);

    setTimeout(() => {
      this.loader = true;
    }, 1500);
    
  }

  changeView(view: string) {
    this.view = view;
  }

}
