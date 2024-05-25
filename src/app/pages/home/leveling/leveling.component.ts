import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompleteLevelingFormComponent } from 'src/app/components/complete-leveling-form/complete-leveling-form.component';
import { Leveling } from 'src/app/models/leveling.model';
import { User } from 'src/app/models/user.model';
import { LevelingService } from 'src/app/services/leveling.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-leveling',
  templateUrl: './leveling.component.html',
  styleUrls: ['./leveling.component.scss']
})
export class LevelingComponent implements OnInit {

  loader = false;
  user!: User;
  id!: string;
  booster_cut!: number;
  adviser_cut!: number;
  leveling!: Leveling | null;
  booster!: User | null;
  adviser!: User | null;
  members: any[] = [];
  
  home = inject(HomeComponent);
  route = inject(ActivatedRoute);
  modal = inject(MatDialog);
  utilsService = inject(UtilsService);
  userService = inject(UserService);
  levelingService = inject(LevelingService);

  async ngOnInit(): Promise<void> {
    this.home.title = "Leveling";

    this.id = this.route.snapshot.params['id'];

    this.user = await this.userService.getUserByUid(this.utilsService.getUserUid()) as User;
    this.leveling = await this.levelingService.getLevelingById(this.id);

    if (this.user.role != 'admin' && this.user.uid != this.leveling?.adviser_id && this.user.uid != this.leveling?.booster_id) {
      this.utilsService.routerLink('/home/unauthorized');
    }

    if (this.leveling == null) {
      this.utilsService.routerLink('/home/error');
    } else {
      this.booster = await this.userService.getUserByUid(this.leveling?.booster_id as string);
      this.adviser = await this.userService.getUserByUid(this.leveling?.adviser_id as string);

      this.booster_cut = (this.leveling?.price as number / 4);
      this.adviser_cut = (this.leveling?.price as number / 4);

      setTimeout(() => {
        this.loader = true;
      }, 1500);
    }
  }

  completeLeveling(leveling: Leveling | null) {
    this.modal.open(CompleteLevelingFormComponent, {
      data: {leveling: leveling}
    });
  }

}
