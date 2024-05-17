import { Component, Input } from '@angular/core';
import { Mythic } from 'src/app/models/mythic.model';

@Component({
  selector: 'app-mythic-list',
  templateUrl: './mythic-list.component.html',
  styleUrls: ['./mythic-list.component.scss']
})
export class MythicListComponent {

  loader = false;
  @Input() mythics!: Mythic[];

}
