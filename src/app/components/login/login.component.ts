import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { User } from 'src/app/models/user.model';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  firebaseService = inject(FirestoreBaasService);
  utilsService = inject(UtilsService);
  spinner = inject(SpinnerComponent);

  async submit() {
    if (this.form.valid) {
      this.spinner.showSpinner();

      this.firebaseService.signIn(this.form.value as User).then(res => {
        this.getUserInfo(res.user.uid);
      }).catch(er => {
        console.log("Incorrect login data, try again.");
      }).finally(() => {
        this.spinner.hideSpinner(2000);
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      let path = 'users/' + uid;

      this.firebaseService.getDocument(path).then((user: DocumentData | undefined) => {
        if (user) {
          const userData = user as User;
          this.utilsService.saveInLocalStorage('user', userData);
          this.utilsService.routerLink('/home');
          this.form.reset();

          let localUser = this.utilsService.getFromLocalStorage('user');
          console.log("Welcome " + localUser?.character + "-" + localUser?.realm);
        } else {
          console.log("getDocument error...");
        }
      }).catch(er => {
        console.log("Incorrect booster data gathering, try again.");
      });
    }
  }

}
