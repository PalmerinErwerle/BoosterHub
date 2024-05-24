import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input() users!: User[];
  @Input() onHoldUsers!: User[];
  @Input() filterUsersValue!: string;

  filteredUsers!: User[];

  ngOnInit() {
    this.filteredUsers = this.users;
  }

  filterUser() {
    this.filteredUsers = this.users.filter(user => {
      for (const property in user) {
        if (typeof user.character_name === 'string' && user.character_name.toLowerCase().includes(this.filterUsersValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
