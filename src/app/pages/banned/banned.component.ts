import { Component, OnInit, inject } from '@angular/core';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToasterComponent } from 'src/app/components/toaster/toaster.component';
import { User } from 'src/app/models/user.model';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-banned',
  templateUrl: './banned.component.html',
  styleUrls: ['./banned.component.scss']
})
export class BannedComponent {

  user!: User;

  utilsService = inject(UtilsService);
  userService = inject(UserService);
  firebaseService = inject(FirestoreBaasService);
  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);


  async ngOnInit() {
    this.user = await this.userService.getUserByUid(this.utilsService.getUserUid()) as User;
  }

  signOut() {
    this.spinner.showSpinner();
    this.firebaseService.signOut();
    this.toaster.successToast("Successfully signed out");
    this.spinner.hideSpinner(1000);
  }

}
