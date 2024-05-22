import { Component, Input, OnInit } from '@angular/core';
import { Raid } from 'src/app/models/raid.model';

@Component({
  selector: 'app-raid-list',
  templateUrl: './raid-list.component.html',
  styleUrls: ['./raid-list.component.scss']
})
export class RaidListComponent implements OnInit {

  loader = false;

  @Input() raids!: Raid[];
  @Input() filterRaidsValue!: string;

  filteredRaids!: Raid[];

  ngOnInit() {
    this.filteredRaids = this.raids;
  }

  filterRaid() {
    this.filteredRaids = this.raids.filter(raid => {
      for (const property in raid) {
        if (typeof raid.id === 'string' && raid.id.toLowerCase().includes(this.filterRaidsValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
