import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompleteRaidFormComponent } from 'src/app/components/complete-raid-form/complete-raid-form.component';
import { Raid } from 'src/app/models/raid.model';
import { User } from 'src/app/models/user.model';
import { RaidService } from 'src/app/services/raid.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnInit {

  loader = false;
  user!: User;
  id!: string;
  booster_cut!: number;
  adviser_cut!: number;
  raid!: Raid | null;
  tank1!: User | null;
  tank2!: User | null;
  healer1!: User | null;
  healer2!: User | null;
  dps_1!: User | null;
  dps_2!: User | null;
  dps_3!: User | null;
  dps_4!: User | null;
  dps_5!: User | null;
  dps_6!: User | null;
  adviser!: User | null;
  members: any[] = [];
  
  home = inject(HomeComponent);
  route = inject(ActivatedRoute);
  modal = inject(MatDialog);
  utilsService = inject(UtilsService);
  userService = inject(UserService);
  raidService = inject(RaidService);

  async ngOnInit(): Promise<void> {
    this.home.title = "Raid";

    this.id = this.route.snapshot.params['id'];

    this.user = await this.userService.getUserByUid(this.utilsService.getUserUid()) as User;
    this.raid = await this.raidService.getRaidById(this.id);

    if (this.user.role != 'admin' && this.user.uid != this.raid?.adviser_id && this.user.uid != this.raid?.tank1_id
        && this.user.uid != this.raid?.tank2_id && this.user.uid != this.raid?.healer1_id && this.user.uid != this.raid?.healer2_id
        && this.user.uid != this.raid?.dps1_id && this.user.uid != this.raid?.dps2_id && this.user.uid != this.raid?.dps3_id
        && this.user.uid != this.raid?.dps4_id && this.user.uid != this.raid?.dps5_id && this.user.uid != this.raid?.dps6_id
    ) {
      this.utilsService.routerLink('/home/unauthorized');
    }

    if (this.raid == null) {
      this.utilsService.routerLink('/home/error');
    } else {
      this.tank1 = await this.userService.getUserByUid(this.raid?.tank1_id as string);
      this.tank2 = await this.userService.getUserByUid(this.raid?.tank2_id as string);
      this.healer1 = await this.userService.getUserByUid(this.raid?.healer1_id as string);
      this.healer2 = await this.userService.getUserByUid(this.raid?.healer2_id as string);
      this.dps_1 = await this.userService.getUserByUid(this.raid?.dps1_id as string);
      this.dps_2 = await this.userService.getUserByUid(this.raid?.dps2_id as string);
      this.dps_3 = await this.userService.getUserByUid(this.raid?.dps3_id as string);
      this.dps_4 = await this.userService.getUserByUid(this.raid?.dps4_id as string);
      this.dps_5 = await this.userService.getUserByUid(this.raid?.dps5_id as string);
      this.dps_6 = await this.userService.getUserByUid(this.raid?.dps6_id as string);
      this.adviser = await this.userService.getUserByUid(this.raid?.adviser_id as string);

      this.booster_cut = (this.raid?.price as number / 20);
      this.adviser_cut = (this.raid?.price as number / 4);

      setTimeout(() => {
        this.loader = true;
      }, 1500);

      this.members = [
        {
          uid: this.tank1?.uid,
          image: '../../../../assets/img/characters/roles/tank.png',
          name: this.tank1?.character_name + "-" + this.tank1?.character_realm
        },
        {
          uid: this.tank2?.uid,
          image: '../../../../assets/img/characters/roles/tank.png',
          name: this.tank2?.character_name + "-" + this.tank2?.character_realm
        },
        {
          uid: this.healer1?.uid,
          image: '../../../../assets/img/characters/roles/healing.png',
          name: this.healer1?.character_name + "-" + this.healer1?.character_realm
        },
        {
          uid: this.healer2?.uid,
          image: '../../../../assets/img/characters/roles/healing.png',
          name: this.healer2?.character_name + "-" + this.healer2?.character_realm
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
        },
        {
          uid: this.dps_3?.uid,
          image: '../../../../assets/img/characters/roles/dps.png',
          name: this.dps_3?.character_name + "-" + this.dps_3?.character_realm
        },
        {
          uid: this.dps_4?.uid,
          image: '../../../../assets/img/characters/roles/dps.png',
          name: this.dps_4?.character_name + "-" + this.dps_4?.character_realm
        },
        {
          uid: this.dps_5?.uid,
          image: '../../../../assets/img/characters/roles/dps.png',
          name: this.dps_5?.character_name + "-" + this.dps_5?.character_realm
        },
        {
          uid: this.dps_6?.uid,
          image: '../../../../assets/img/characters/roles/dps.png',
          name: this.dps_6?.character_name + "-" + this.dps_6?.character_realm
        }
      ]
    }
  }

  completeRaid(raid: Raid | null) {
    this.modal.open(CompleteRaidFormComponent, {
      data: {raid: raid}
    });
  }

}
