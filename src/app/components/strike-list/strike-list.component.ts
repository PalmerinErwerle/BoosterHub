import { Component, Input, OnInit, inject } from '@angular/core';
import { Strike } from 'src/app/models/strike.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-strike-list',
  templateUrl: './strike-list.component.html',
  styleUrl: './strike-list.component.scss'
})
export class StrikeListComponent implements OnInit {

  @Input() isAdmin!: boolean;
  @Input() strikes!: Strike[];
  @Input() filterLevelingsValue!: string;

  filteredStrikes!: Strike[];
  
  userService = inject(UserService);

  ngOnInit() {
    this.filteredStrikes = this.strikes;
  }

  filterLeveling() {
    this.filteredStrikes = this.strikes.filter(strike => {
      for (const property in strike) {
        const strikedName = this.userService.getUserByUid(strike.striked_id) as unknown as string;
        if (typeof strikedName === 'string' && strikedName.toLowerCase().includes(this.filterLevelingsValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
