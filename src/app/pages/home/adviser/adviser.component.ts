import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MythicFormComponent } from 'src/app/components/mythic-form/mythic-form.component';
import { Legacy } from 'src/app/models/legacy.model';
import { Leveling } from 'src/app/models/leveling.model';
import { Mythic } from 'src/app/models/mythic.model';
import { Raid } from 'src/app/models/raid.model';
import { LegacyService } from 'src/app/services/legacy.service';
import { LevelingService } from 'src/app/services/leveling.service';
import { MythicService } from 'src/app/services/mythic.service';
import { RaidService } from 'src/app/services/raid.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.scss']
})
export class AdviserComponent implements OnInit {

  loader = false;

  uid!: string;
  buttons!: any[];
  view = "general";
  
  mythics!: Mythic[];
  raids!: Raid[];
  legacies!: Legacy[];
  levelings!:Leveling[];

  home = inject(HomeComponent);
  modal = inject(MatDialog);
  utilsService = inject(UtilsService);
  mythicService = inject(MythicService);
  raidService = inject(RaidService);
  legacyService = inject(LegacyService);
  levelingService = inject(LevelingService);

  async ngOnInit() {
    this.home.title = "Adviser Menu";

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
    ];

    this.mythics = await this.mythicService.getMythicsByAdviser(this.uid);
    this.raids = await this.raidService.getRaidsByAdviser(this.uid);
    this.legacies = await this.legacyService.getRaidsByAdviser(this.uid);
    this.levelings = await this.levelingService.getLevelingsByAdviser(this.uid);

    setTimeout(() => {
      this.loader = true;
    }, 1500);
  }

  changeView(view: string) {
    this.view = view;
  }

  newMythic() {
    this.modal.open(MythicFormComponent);
  }

  newRaid() {

  }

  newLegacy() {

  }

  newLeveling() {
    
  }

}
