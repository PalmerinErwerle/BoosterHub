import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MythicFormComponent } from 'src/app/components/mythic-form/mythic-form.component';
import { Mythic } from 'src/app/models/mythic.model';
import { MythicService } from 'src/app/services/mythic.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  modal = inject(MatDialog);
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
    ];

    this.mythics = await this.mythicService.getMythicsByAdviser(this.uid);

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

}
