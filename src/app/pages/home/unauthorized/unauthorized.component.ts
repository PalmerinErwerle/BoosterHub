import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  home = inject(HomeComponent);

  ngOnInit() {
    this.home.title = "BoosterHub";
  }

}
