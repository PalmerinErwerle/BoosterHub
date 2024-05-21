import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  home = inject(HomeComponent);

  ngOnInit() {
    this.home.title = "BoosterHub";
  }

}
