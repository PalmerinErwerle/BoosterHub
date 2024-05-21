import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  home = inject(HomeComponent);

  ngOnInit() {
    this.home.title = "BoosterHub";
  }
  
}
