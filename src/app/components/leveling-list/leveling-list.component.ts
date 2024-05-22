import { Component, Input, OnInit } from '@angular/core';
import { Leveling } from 'src/app/models/leveling.model';

@Component({
  selector: 'app-leveling-list',
  templateUrl: './leveling-list.component.html',
  styleUrls: ['./leveling-list.component.scss']
})
export class LevelingListComponent implements OnInit {

  @Input() levelings!: Leveling[];
  @Input() filterLevelingsValue!: string;

  filteredLevelings!: Leveling[];

  ngOnInit() {
    this.filteredLevelings = this.levelings;
  }

  filterLeveling() {
    this.filteredLevelings = this.levelings.filter(leveling => {
      for (const property in leveling) {
        if (typeof leveling.id === 'string' && leveling.id.toLowerCase().includes(this.filterLevelingsValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
