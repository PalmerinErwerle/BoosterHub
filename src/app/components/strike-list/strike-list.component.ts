import { Component, Input, OnInit, inject } from '@angular/core';
import { Strike } from 'src/app/models/strike.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-strike-list',
  templateUrl: './strike-list.component.html',
  styleUrl: './strike-list.component.scss'
})
export class StrikeListComponent implements OnInit {

  @Input() isAdmin!: boolean;
  @Input() strikes!: Strike[];
  @Input() filterStrikesValue!: string;

  filteredStrikes!: Strike[];
  
  userService = inject(UserService);

  ngOnInit() {
    this.filteredStrikes = this.strikes;
  }

  filterStrike() {
    const promises = this.strikes.map(async (strike) => {
      return {
        strike,
        includesFilter: (await this.getStrikedName(strike.striked_id)).toLowerCase().includes(this.filterStrikesValue.toLowerCase())
      };
    });
    Promise.all(promises).then(results => {
        this.filteredStrikes = results.filter(result => result.includesFilter).map(result => result.strike);
    });
  }

  async getStrikedName(striked_id: string) {
    const strikedUser = await this.userService.getUserByUid(striked_id) as unknown as User;
    return strikedUser.character_name;
  }

}
