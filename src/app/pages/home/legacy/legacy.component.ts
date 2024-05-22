import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CompleteLegacyFormComponent } from 'src/app/components/complete-legacy-form/complete-legacy-form.component';
import { Legacy } from 'src/app/models/legacy.model';
import { User } from 'src/app/models/user.model';
import { LegacyService } from 'src/app/services/legacy.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss']
})
export class LegacyComponent implements OnInit {

  loader = false;
  id!: string;
  booster_cut!: number;
  adviser_cut!: number;
  legacy!: Legacy | null;
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
  legacyService = inject(LegacyService);

  async ngOnInit(): Promise<void> {
    this.home.title = "Raid";

    this.id = this.route.snapshot.params['id'];
    this.legacy = await this.legacyService.getRaidById(this.id);

    if (this.legacy == null) {
      this.utilsService.routerLink('/home/error');
    } else {
      this.tank1 = await this.userService.getUserByUid(this.legacy?.tank1_id as string);
      this.tank2 = await this.userService.getUserByUid(this.legacy?.tank2_id as string);
      this.healer1 = await this.userService.getUserByUid(this.legacy?.healer1_id as string);
      this.healer2 = await this.userService.getUserByUid(this.legacy?.healer2_id as string);
      this.dps_1 = await this.userService.getUserByUid(this.legacy?.dps1_id as string);
      this.dps_2 = await this.userService.getUserByUid(this.legacy?.dps2_id as string);
      this.dps_3 = await this.userService.getUserByUid(this.legacy?.dps3_id as string);
      this.dps_4 = await this.userService.getUserByUid(this.legacy?.dps4_id as string);
      this.dps_5 = await this.userService.getUserByUid(this.legacy?.dps5_id as string);
      this.dps_6 = await this.userService.getUserByUid(this.legacy?.dps6_id as string);
      this.adviser = await this.userService.getUserByUid(this.legacy?.adviser_id as string);

      this.booster_cut = (this.legacy?.price as number / 20);
      this.adviser_cut = (this.legacy?.price as number / 4);

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

  completeLegacy(legacy: Legacy | null) {
    this.modal.open(CompleteLegacyFormComponent, {
      data: {legacy: legacy}
    });
  }

}
