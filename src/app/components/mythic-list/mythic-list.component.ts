import { Component, Input, OnInit } from '@angular/core';
import { Mythic } from 'src/app/models/mythic.model';

@Component({
  selector: 'app-mythic-list',
  templateUrl: './mythic-list.component.html',
  styleUrls: ['./mythic-list.component.scss']
})
export class MythicListComponent implements OnInit {

  loader = false;

  @Input() mythics!: Mythic[];
  @Input() filterMythicsValue!: string;

  filteredMythics!: Mythic[];

  ngOnInit() {
    this.filteredMythics = this.mythics;
  }

  filterMythic() {
    this.filteredMythics = this.mythics.filter(mythic => {
      // Recorrer las propiedades del objeto mythic y verificar si alguna coincide con filterValue
      for (const property in mythic) {
        if (typeof mythic.id === 'string' && mythic.id.toLowerCase().includes(this.filterMythicsValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
