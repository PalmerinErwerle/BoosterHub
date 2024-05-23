import { Component, Input } from '@angular/core';
import { Legacy } from 'src/app/models/legacy.model';
import { Leveling } from 'src/app/models/leveling.model';
import { Mythic } from 'src/app/models/mythic.model';
import { Raid } from 'src/app/models/raid.model';
import { Strike } from 'src/app/models/strike.model';

@Component({
  selector: 'app-general-charts',
  templateUrl: './general-charts.component.html',
  styleUrls: ['./general-charts.component.scss']
})
export class GeneralChartsComponent {

  @Input() mythics!: Mythic[];
  @Input() raids!: Raid[];
  @Input() legacies!: Legacy[];
  @Input() levelings!: Leveling[];
  @Input() strikes!: Strike[];

}
