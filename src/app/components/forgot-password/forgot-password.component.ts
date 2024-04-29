import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  firebaseService = inject(FirestoreBaasService);
  utilsService = inject(UtilsService);
  authComponent = inject(AuthComponent);

  async submit() {
    if (this.form.valid) {
      this.firebaseService.sendRecoveryEmail(this.form.value.email!).then(res => {
        console.log("A password recovery mail has been sent to your email address.");

        this.authComponent.loginView();
        this.form.reset();
      }).catch(er => {
        console.log("There is no booster with that email address.");
      })
    }
  }

}


