import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styleUrls: ['./booster.component.scss']
})
export class BoosterComponent implements OnInit {

  buttons!: any[];

  ngOnInit() {
    
    this.buttons = [
      {
        title: 'General',
        view: 'general'
      },
      {
        title: 'Mythic +',
        view: 'mythic'
      },
      {
        title: 'Raids',
        view: 'raid'
      },
      {
        title: 'Legacy Raids',
        view: 'legacy'
      },
      {
        title: 'Leveling',
        view: 'leveling'
      },
      {
        title: 'Strikes',
        view: 'strike'
      },
    ]
    
  }

}
