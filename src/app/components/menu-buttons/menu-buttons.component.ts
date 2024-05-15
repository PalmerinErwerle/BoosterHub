import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss']
})
export class MenuButtonsComponent {

  @Input() buttons!: any[];

  view = "general";

  getView(view: string) {
    this.view = view;
  }

}
