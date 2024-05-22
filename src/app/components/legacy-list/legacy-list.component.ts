import { Component, Input } from '@angular/core';
import { Legacy } from 'src/app/models/legacy.model';

@Component({
  selector: 'app-legacy-list',
  templateUrl: './legacy-list.component.html',
  styleUrls: ['./legacy-list.component.scss']
})
export class LegacyListComponent {

  loader = false;

  @Input() legacies!: Legacy[];
  @Input() filterLegaciesValue!: string;

  filteredLegacies!: Legacy[];

  ngOnInit() {
    this.filteredLegacies = this.legacies;
  }

  filterLegacy() {
    this.filteredLegacies = this.legacies.filter(legacy => {
      for (const property in legacy) {
        if (typeof legacy.id === 'string' && legacy.id.toLowerCase().includes(this.filterLegaciesValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
