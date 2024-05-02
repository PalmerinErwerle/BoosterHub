import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = new FormGroup({
    uid: new FormControl(''),
    character: new FormControl('', [Validators.required]),
    realm: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  firebaseService = inject(FirestoreBaasService);
  utilsService = inject(UtilsService);
  spinner = inject(SpinnerComponent);

  async submit() {
    if (this.form.valid) {
      this.spinner.showSpinner();

      this.firebaseService.signUp(this.form.value as User).then(async res => {
        await this.firebaseService.updateUser(this.form.value.character);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);
      }).catch(er => {
        console.log("Incorrect register, try again.");
      }).finally(() => {
        this.spinner.hideSpinner(2000);
      });
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      let path = 'users/' + uid;
      let username = this.form.value.character;
      delete this.form.value.password;

      this.firebaseService.setDocument(path, this.form.value).then(async res => {
        this.utilsService.saveInLocalStorage('user', this.form.value);
        this.utilsService.routerLink('/home');
        this.form.reset();

        let localUser = this.utilsService.getFromLocalStorage('user');
        console.log("Welcome " + localUser?.character + "-" + localUser?.realm);
      }).catch(er => {
        console.log("Incorrect booster data gathering, try again.");
      });
    }
  }

}
