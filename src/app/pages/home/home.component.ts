import { Component, OnInit, inject } from '@angular/core';
import { first } from 'rxjs';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pages = [
    {
      title: 'My Profile',
      url: '/home',
      icon: 'person'
    },
    {
      title: 'Booster Menu',
      url: '/home',
      icon: 'work'
    },
    {
      title: 'Adviser Menu',
      url: '/home',
      icon: 'assignment_ind'
    },
    {
      title: 'Admin Menu',
      url: '/home',
      icon: 'security'
    }
  ]

  title = "BoosterHub";
  screenWidth!: number;

  firebaseService = inject(FirestoreBaasService);
  spinner = inject(SpinnerComponent);

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  // Cerrar sesión
  signOut() {
    this.spinner.showSpinner();
    this.firebaseService.signOut();
    this.spinner.hideSpinner(1000);
  }

}
