import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToasterComponent } from '../toaster/toaster.component';
import { RaiderIoService } from 'src/app/services/raider-io.service';
import { RaiderIoCharacter } from 'src/app/models/raiderio-character.model';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  raiderIoData!: RaiderIoCharacter;
  characterData!: User | null;

  form = new FormGroup({
    uid: new FormControl(''),

    character_name: new FormControl('', [Validators.required]),
    character_realm: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{0,}$/)]),
    role: new FormControl(''),

    character_faction: new FormControl(''),
    character_race: new FormControl(''),
    character_role: new FormControl(''),
    character_class: new FormControl(''),
    character_ilevel: new FormControl(),
    character_rio: new FormControl()
  })

  firebaseService = inject(FirestoreBaasService);
  utilsService = inject(UtilsService);
  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  raiderIo = inject(RaiderIoService);
  userService = inject(UserService);

  async submit() {
    if (this.form.valid) {
      this.spinner.showSpinner();
      this.characterData = await this.userService.getUserByCharacter(this.form.value.character_name as string, this.form.value.character_realm as string);

      if (this.characterData != null) {
        this.toaster.errorToast('This character is already registered in BoosterHub');
        this.spinner.hideSpinner(2000);
      } else {

        this.raiderIo.getCharacter(this.form.value.character_name, this.form.value.character_realm, "eu")
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 400) {
                this.toaster.errorToast('This character does not exist in World of Warcraft');
                this.spinner.hideSpinner(2000);
                return throwError(() => new Error('ERROR 404: This Character does not exist in World of Warcraft'));
              } else {
                this.toaster.errorToast('Unexpected error while loading the character, please try again');
                this.spinner.hideSpinner(2000);
                return throwError(() => new Error('Unexpected error while loading the character, please try again'));
              }
            })
          ).subscribe(data => {
            this.raiderIoData = data;

            this.form.patchValue({
              character_faction: this.raiderIoData?.faction,
              character_race: this.raiderIoData?.race,
              character_role: this.raiderIoData?.active_spec_role.toLowerCase(),
              character_class: this.raiderIoData?.class,
              character_ilevel: this.raiderIoData?.gear.item_level_equipped,
              character_rio: this.raiderIoData?.mythic_plus_scores_by_season[0].scores.all
            });

            this.firebaseService.signUp(this.form.value as User).then(async res => {
              await this.firebaseService.updateUser(this.form.value.character_name);

              let uid = res.user.uid;
              this.form.controls.uid.setValue(uid);
              this.form.controls.role.setValue('onHold');
              this.setUserInfo(uid);
            }).catch(er => {
              this.toaster.errorToast("This booster mail is already registered");
            }).finally(() => {
              this.spinner.hideSpinner(2000);
            });

          });

      }
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      let path = 'users/' + uid;
      delete this.form.value.password;

      this.firebaseService.setDocument(path, this.form.value).then(async res => {

        const character_name = this.form.value.character_name;
        const character_realm = this.form.value.character_realm;

        delete this.form.value.email;
        delete this.form.value.role;
        delete this.form.value.character_name;
        delete this.form.value.character_realm;
        delete this.form.value.character_faction;
        delete this.form.value.character_race;
        delete this.form.value.character_role;
        delete this.form.value.character_class;
        delete this.form.value.character_ilevel;
        delete this.form.value.character_rio;

        this.utilsService.saveInLocalStorage('user', this.form.value);
        this.utilsService.routerLink('/home');
        this.form.reset();

        this.toaster.successToast("Welcome " + character_name + "-" + character_realm);
      }).catch(er => {
        this.toaster.errorToast("Incorrect booster data gathering, try again");
      });
    }
  }

}
