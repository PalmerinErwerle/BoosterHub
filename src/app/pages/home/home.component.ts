import { Component, OnInit, inject } from '@angular/core';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToasterComponent } from 'src/app/components/toaster/toaster.component';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = "BoosterHub";
  screenWidth!: number;
  uid!: string;

  pages: any[] = [];

  firebaseService = inject(FirestoreBaasService);
  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  utilsService = inject(UtilsService);

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };

    this.uid = this.getUserUid();

    this.pages = [
      {
        title: 'Home',
        url: '',
        icon: 'home'
      },
      {
        title: 'My Profile',
        url: 'profile/' + this.uid,
        icon: 'person'
      },
      {
        title: 'Booster Menu',
        url: 'booster-menu',
        icon: 'work'
      },
      {
        title: 'Adviser Menu',
        url: 'adviser-menu',
        icon: 'assignment_ind'
      },
      {
        title: 'Admin Menu',
        url: 'admin-menu',
        icon: 'security'
      }
    ]
  }
  

  getUserUid() {
    let localUser = this.utilsService.getFromLocalStorage('user');
    let uid = localUser.uid;
    return uid;
  }

  // Cerrar sesión
  signOut() {
    this.spinner.showSpinner();
    this.firebaseService.signOut();
    this.toaster.successToast("Successfully signed out");
    this.spinner.hideSpinner(1000);
  }

}
