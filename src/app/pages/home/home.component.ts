import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToasterComponent } from 'src/app/components/toaster/toaster.component';
import { User } from 'src/app/models/user.model';
import { FirestoreBaasService } from 'src/app/services/firestore-baas.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {

  title!: string;
  screenWidth!: number;
  uid!: string;
  user!: User;

  pages: any[] = [];

  firebaseService = inject(FirestoreBaasService);
  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  userService = inject(UserService);
  utilsService = inject(UtilsService);
  cdref = inject(ChangeDetectorRef);

  async ngOnInit() {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };

    this.uid = this.utilsService.getUserUid();
    this.user = await this.userService.getUserByUid(this.uid) as User;

    this.pages = [
      {
        title: 'Home',
        url: '',
        icon: 'home',
        query1: 'booster',
        query2: 'adviser',
        query3: 'admin'
      },
      {
        title: 'My Profile',
        url: 'profile/' + this.uid,
        icon: 'person',
        query1: 'booster',
        query2: 'adviser',
        query3: 'admin'
      },
      {
        title: 'Booster Menu',
        url: 'booster-menu',
        icon: 'work',
        query1: 'booster',
        query2: 'adviser',
        query3: 'admin'
      },
      {
        title: 'Adviser Menu',
        url: 'adviser-menu',
        icon: 'assignment_ind',
        query1: 'adviser',
        query2: 'adviser',
        query3: 'admin'
      },
      {
        title: 'Admin Menu',
        url: 'admin-menu',
        icon: 'security',
        query1: 'admin',
        query2: 'admin',
        query3: 'admin'
      }
    ]
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  // Cerrar sesión
  signOut() {
    this.spinner.showSpinner();
    this.firebaseService.signOut();
    this.toaster.successToast("Successfully signed out");
    this.spinner.hideSpinner(1000);
  }

}
