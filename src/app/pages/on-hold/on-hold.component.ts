import { Component, inject } from '@angular/core';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToasterComponent } from 'src/app/components/toaster/toaster.component';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.scss']
})
export class OnHoldComponent {
  
  firebaseService = inject(FirestoreBaasService);
  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);

  signOut() {
    this.spinner.showSpinner();
    this.firebaseService.signOut();
    this.toaster.successToast("Successfully signed out");
    this.spinner.hideSpinner(1000);
  }

}
