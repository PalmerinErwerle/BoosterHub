import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToasterComponent } from '../toaster/toaster.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  characterData!: User | null;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  firebaseService = inject(FirestoreBaasService);
  utilsService = inject(UtilsService);
  spinner = inject(SpinnerComponent);
  authComponent = inject(AuthComponent);
  toaster = inject(ToasterComponent);
  userService = inject(UserService);

  async submit() {
    if (this.form.valid) {
      this.spinner.showSpinner();
      this.characterData = await this.userService.getUserByEmail(this.form.value.email as string);

      if (this.characterData == null) {
        this.toaster.errorToast('This email is not registered in BoosterHub');
        this.spinner.hideSpinner(2000);
      } else {

        this.firebaseService.sendRecoveryEmail(this.form.value.email!).then(res => {
          this.toaster.successToast("A password recovery mail has been sent to your email address.");

          this.authComponent.loginView();
          this.form.reset();
        }).catch(er => {
          this.toaster.errorToast("There is no booster registered with this email address.");
        }).finally(() => {
          this.spinner.hideSpinner(2000);
        });

      }
    }
  }

}


