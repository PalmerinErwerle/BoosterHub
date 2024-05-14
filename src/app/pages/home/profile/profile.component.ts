import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loader = false;
  uid!: string;
  character!: User | null;
  raiderIoLink!: string;
  cards: any[] = [];

  route = inject(ActivatedRoute);
  utilsService = inject(UtilsService);
  userService = inject(UserService);

  async ngOnInit(): Promise<void> {
    this.uid = this.route.snapshot.params['uid'];
    this.character = await this.userService.getUserByUid(this.uid);

    setTimeout(() => {
      this.loader = true;
    }, 1500);

    if (this.character == null) {
      this.utilsService.routerLink('/error');
    }

    let realmName = this.character?.character_realm.split("'").join("");
    this.raiderIoLink = "https://raider.io/characters/eu/" + realmName + "/" + this.character?.character_name;

    this.cards = [
      {
        title: this.factionName(this.character?.character_faction),
        image: '../../../../assets/img/characters/factions/'+ this.character?.character_faction +'.png'
      },
      {
        title: this.character?.character_race,
        image: '../../../../assets/img/characters/races/'+ this.character?.character_race +'.png'
      },
      {
        title: this.character?.character_class,
        image: '../../../../assets/img/characters/classes/'+ this.character?.character_class +'.png'
      },
      {
        title: this.roleName(this.character?.character_role),
        image: '../../../../assets/img/characters/roles/'+ this.character?.character_role +'.png'
      },
      {
        title: Math.round(this.character?.character_ilevel as number),
        head: "Total Item Level"
      },
      {
        title: Math.round(this.character?.character_rio as unknown as number),
        head: "Raider.IO Score"
      }
    ]
  }

  factionName(faction: string | undefined) {
    if (faction == "horde") {
      return "Horde"
    } else {
      return "Alliance"
    }
  }

  roleName(role: string | undefined) {
    if (role == "dps") {
      return "DPS"
    } else if (role == "tank") {
      return "Tank"
    } else {
      return "Healer"
    }
  }

}
