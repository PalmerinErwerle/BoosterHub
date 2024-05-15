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
    console.log("Antes: " + this.view);
    this.view = view;
    console.log("Despues: " + this.view);
  }

}
