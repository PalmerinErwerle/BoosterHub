import { Component, OnInit, inject } from '@angular/core';
import { Mythic } from 'src/app/models/mythic.model';
import { MythicService } from 'src/app/services/mythic.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  utilsService = inject(UtilsService);
  mythicService = inject(MythicService);

  async ngOnInit() {

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

    setTimeout(() => {
      this.loader = true;
    }, 1500);
    
  }

  changeView(view: string) {
    this.view = view;
  }

}
