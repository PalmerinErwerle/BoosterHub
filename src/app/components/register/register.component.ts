import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { User } from 'src/app/models/user.model';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  async submit() {
    if (this.form.valid) {
      this.firebaseService.signUp(this.form.value as User).then(async res => {
        await this.firebaseService.updateUser(this.form.value.character);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);
      }).catch(er => {
        console.log("Incorrect register, try again.");
        });
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      let path = 'users/' + uid;
      let name = this.form.value.character;
      delete this.form.value.password;

      this.firebaseService.setDocument(path, this.form.value).then(async res => {
        this.utilsService.saveInLocalStorage('user', this.form.value);
        this.utilsService.routerLink('/home');
        this.form.reset();

        console.log("Welcome")
      }).catch(er => {
        console.log("Incorrect booster data gathering, try again.");
      });
    }
  }

}
