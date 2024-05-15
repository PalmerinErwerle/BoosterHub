import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  buttons!: any[];

  ngOnInit() {
    
    this.buttons = [
      {
        title: 'Users',
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
