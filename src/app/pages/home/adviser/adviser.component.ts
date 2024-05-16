import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MythicFormComponent } from 'src/app/components/mythic-form/mythic-form.component';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.scss']
})
export class AdviserComponent implements OnInit {

  buttons!: any[];
  view = "general";

  modal = inject(MatDialog);

  ngOnInit() {
    
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
    ]
    
  }

  changeView(view: string) {
    this.view = view;
  }

  newMythic() {
    this.modal.open(MythicFormComponent);
  }

}
