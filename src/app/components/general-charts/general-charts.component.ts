import { Component, Input, OnInit } from '@angular/core';
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
export class GeneralChartsComponent implements OnInit {

  @Input() view!: string;
  @Input() mythics!: Mythic[];
  @Input() raids!: Raid[];
  @Input() legacies!: Legacy[];
  @Input() levelings!: Leveling[];
  @Input() strikes!: Strike[];

  totalEarnings!: number;

  mythicEarnings = 0;
  raidEarnings = 0;
  legacyEarnings = 0;
  levelingEarnings = 0;
  strikeTotalPenalty = 0;

  ngOnInit() {
    if (this.view == 'booster') {
      this.mythics.forEach(mythic => {
        if (mythic.status == 'completed' || mythic.status == 'issues') {
          this.mythicEarnings = this.mythicEarnings + (mythic.price / 8);
        }
      });
      this.raids.forEach(raid => {
        if (raid.status == 'completed' || raid.status == 'issues') {
          this.raidEarnings = this.raidEarnings + (raid.price / 20);
        }
      });
      this.legacies.forEach(legacy => {
        if (legacy.status == 'completed' || legacy.status == 'issues') {
          this.legacyEarnings = this.legacyEarnings + (legacy.price / 20);
        }
      });
      this.levelings.forEach(leveling => {
        if (leveling.status == 'completed' || leveling.status == 'issues') {
          this.levelingEarnings = this.levelingEarnings + (leveling.price / 4);
        }
      });
      this.strikes.forEach(strike => {
        if (strike.status == 'unpaid') {
          this.strikeTotalPenalty = this.strikeTotalPenalty + (strike.penalty);
        }
      });
      this.totalEarnings = this.mythicEarnings + this.raidEarnings + this.legacyEarnings + this.levelingEarnings - this.strikeTotalPenalty;

    } else {
      this.mythics.forEach(mythic => {
        if (mythic.status == 'completed' || mythic.status == 'issues') {
          this.mythicEarnings = this.mythicEarnings + (mythic.price / 4);
        }
      });
      this.raids.forEach(raid => {
        if (raid.status == 'completed' || raid.status == 'issues') {
          this.raidEarnings = this.raidEarnings + (raid.price / 4);
        }
      });
      this.legacies.forEach(legacy => {
        if (legacy.status == 'completed' || legacy.status == 'issues') {
          this.legacyEarnings = this.legacyEarnings + (legacy.price / 4);
        }
      });
      this.levelings.forEach(leveling => {
        if (leveling.status == 'completed' || leveling.status == 'issues') {
          this.levelingEarnings = this.levelingEarnings + (leveling.price / 4);
        }
      });
      this.totalEarnings = this.mythicEarnings + this.raidEarnings + this.legacyEarnings + this.levelingEarnings;
    }
  }

}
