import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
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
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.scss']
})
export class DeniedComponent implements OnInit {

  user!: User;
  raiderIoData!: RaiderIoCharacter;

  utilsService = inject(UtilsService);
  userService = inject(UserService);
  firebaseService = inject(FirestoreBaasService);
  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  raiderIo = inject(RaiderIoService);


  async ngOnInit() {
    this.user = await this.userService.getUserByUid(this.utilsService.getUserUid()) as User;
  }

  signOut() {
    this.spinner.showSpinner();
    this.firebaseService.signOut();
    this.toaster.successToast("Successfully signed out");
    this.spinner.hideSpinner(1000);
  }

  async updateUser(character_name: string | undefined, character_realm: string | undefined) {
    let path = 'users/' + this.user.uid;

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

        this.user.character_faction = this.raiderIoData?.faction;
        this.user.character_race = this.raiderIoData?.race;
        this.user.character_role = this.raiderIoData?.active_spec_role.toLowerCase();
        this.user.character_class = this.raiderIoData?.class;
        this.user.character_ilevel = this.raiderIoData?.gear.item_level_equipped;
        this.user.character_rio = this.raiderIoData?.mythic_plus_scores_by_season[0].scores.all as unknown as string;
        this.user.role = "onHold";

        this.firebaseService.updateDocument(path, this.user).then(async () => {
        }).catch(er => {
          this.toaster.errorToast("Incorrect booster data gathering, try again");
        }).finally(() => {
          this.toaster.successToast("User updated successfully");
          this.spinner.hideSpinner(2000);
          this.utilsService.reload("/denied", 2000);
        })
      });

  }

}
