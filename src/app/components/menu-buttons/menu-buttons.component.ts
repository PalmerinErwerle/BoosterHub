import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss']
})
export class MenuButtonsComponent {

  @Input() buttons!: any[];
  @Input() view!: string;
  @Output() getViewEvent = new EventEmitter<string>()

  getView(view: string) {
    this.getViewEvent.emit(view)
  }

}
