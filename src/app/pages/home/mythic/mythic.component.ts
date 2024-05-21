import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompleteMythicFormComponent } from 'src/app/components/complete-mythic-form/complete-mythic-form.component';
import { Mythic } from 'src/app/models/mythic.model';
import { User } from 'src/app/models/user.model';
import { MythicService } from 'src/app/services/mythic.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-mythic',
  templateUrl: './mythic.component.html',
  styleUrls: ['./mythic.component.scss']
})
export class MythicComponent implements OnInit {

  loader = false;
  id!: string;
  booster_cut!: number;
  adviser_cut!: number;
  mythic!: Mythic | null;
  tank!: User | null;
  healer!: User | null;
  dps_1!: User | null;
  dps_2!: User | null;
  adviser!: User | null;
  members: any[] = [];
  
  home = inject(HomeComponent);
  route = inject(ActivatedRoute);
  modal = inject(MatDialog);
  utilsService = inject(UtilsService);
  userService = inject(UserService);
  mythicService = inject(MythicService);

  async ngOnInit(): Promise<void> {
    this.home.title = "Mythic+";

    this.id = this.route.snapshot.params['id'];
    this.mythic = await this.mythicService.getMythicById(this.id);

    if (this.mythic == null) {
      this.utilsService.routerLink('/home/error');
    } else {
      this.tank = await this.userService.getUserByUid(this.mythic?.tank_id as string);
      this.healer = await this.userService.getUserByUid(this.mythic?.healer_id as string);
      this.dps_1 = await this.userService.getUserByUid(this.mythic?.dps1_id as string);
      this.dps_2 = await this.userService.getUserByUid(this.mythic?.dps2_id as string);
      this.adviser = await this.userService.getUserByUid(this.mythic?.adviser_id as string);

      this.booster_cut = (this.mythic?.price as number / 8);
      this.adviser_cut = (this.mythic?.price as number / 4);

      setTimeout(() => {
        this.loader = true;
      }, 1500);

      this.members = [
        {
          uid: this.tank?.uid,
          image: '../../../../assets/img/characters/roles/tank.png',
          name: this.tank?.character_name + "-" + this.tank?.character_realm
        },
        {
          uid: this.healer?.uid,
          image: '../../../../assets/img/characters/roles/healing.png',
          name: this.healer?.character_name + "-" + this.healer?.character_realm
        },
        {
          uid: this.dps_1?.uid,
          image: '../../../../assets/img/characters/roles/dps.png',
          name: this.dps_1?.character_name + "-" + this.dps_1?.character_realm
        },
        {
          uid: this.dps_2?.uid,
          image: '../../../../assets/img/characters/roles/dps.png',
          name: this.dps_2?.character_name + "-" + this.dps_2?.character_realm
        }
      ]
    }
  }

  completeMythic(mythic: Mythic | null) {
    this.modal.open(CompleteMythicFormComponent, {
      data: {mythic: mythic}
    });
  }

}
