import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToasterComponent } from 'src/app/components/toaster/toaster.component';
import { RaiderIoCharacter } from 'src/app/models/raiderio-character.model';
import { User } from 'src/app/models/user.model';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { RaiderIoService } from 'src/app/services/raider-io.service';
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
  raiderIoData!: RaiderIoCharacter;
  raiderIoLink!: string;
  cards: any[] = [];

  route = inject(ActivatedRoute);
  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  firebaseService = inject(FirestoreBaasService);
  raiderIo = inject(RaiderIoService);
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
        image: '../../../../assets/img/characters/factions/' + this.character?.character_faction + '.png'
      },
      {
        title: this.character?.character_race,
        image: '../../../../assets/img/characters/races/' + this.character?.character_race + '.png'
      },
      {
        title: this.character?.character_class,
        image: '../../../../assets/img/characters/classes/' + this.character?.character_class + '.png'
      },
      {
        title: this.roleName(this.character?.character_role),
        image: '../../../../assets/img/characters/roles/' + this.character?.character_role + '.png'
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

  async updateUser(character_name: string | undefined, character_realm: string | undefined) {
    let path = 'users/' + this.uid;

    this.spinner.showSpinner();

    this.raiderIo.getCharacter(character_name, character_realm, "eu")
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.toaster.errorToast('Unexpected error while loading the character, please try again');
        this.spinner.hideSpinner(2000);
        return throwError(() => new Error('Unexpected error while loading the character, please try again'));
      })
    ).subscribe(data => {
        this.raiderIoData = data;

        this.character!.character_faction = this.raiderIoData?.faction;
        this.character!.character_race = this.raiderIoData?.race;
        this.character!.character_role = this.raiderIoData?.active_spec_role.toLowerCase();
        this.character!.character_class = this.raiderIoData?.class;
        this.character!.character_ilevel = this.raiderIoData?.gear.item_level_equipped;
        this.character!.character_rio = this.raiderIoData?.mythic_plus_scores_by_season[0].scores.all as unknown as string;

        this.firebaseService.updateDocument(path, this.character).then(async () => {
        }).catch(er => {
          this.toaster.errorToast("Incorrect booster data gathering, try again");
        });
      });

    this.toaster.successToast("User updated successfully");
    this.spinner.hideSpinner(2000);
    this.utilsService.reload("/home/profile/" + this.uid, 2000);
  }

}
