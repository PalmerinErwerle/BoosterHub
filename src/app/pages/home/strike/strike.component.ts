import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Strike } from 'src/app/models/strike.model';
import { User } from 'src/app/models/user.model';
import { StrikeService } from 'src/app/services/strike.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-strike',
  templateUrl: './strike.component.html',
  styleUrls: ['./strike.component.scss']
})
export class StrikeComponent {

  loader = false;
  id!: string;
  strike!: Strike | null;
  striked!: User | null;
  admin!: User | null;
  members: any[] = [];
  
  home = inject(HomeComponent);
  route = inject(ActivatedRoute);
  utilsService = inject(UtilsService);
  userService = inject(UserService);
  strikeService = inject(StrikeService);

  async ngOnInit(): Promise<void> {
    this.home.title = "Strike";

    this.id = this.route.snapshot.params['id'];
    this.strike = await this.strikeService.getStrikeById(this.id);

    if (this.strike == null) {
      this.utilsService.routerLink('/home/error');
    } else {
      this.striked = await this.userService.getUserByUid(this.strike?.striked_id as string);
      this.admin = await this.userService.getUserByUid(this.strike?.admin_id as string);

      setTimeout(() => {
        this.loader = true;
      }, 1500);
    }
  }

  checkAsPaid() {
    this.strikeService.updateStrikeStatus(this.strike as Strike, this.strike?.id as string, 'paid');
  }

}
