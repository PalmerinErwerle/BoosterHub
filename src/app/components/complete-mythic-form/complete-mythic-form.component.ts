import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mythic } from 'src/app/models/mythic.model';

@Component({
  selector: 'app-complete-mythic-form',
  templateUrl: './complete-mythic-form.component.html',
  styleUrls: ['./complete-mythic-form.component.scss']
})
export class CompleteMythicFormComponent implements OnInit {

  modalRef = inject(MatDialogRef<CompleteMythicFormComponent>);
  mythic = inject(MAT_DIALOG_DATA).mythic;

  status = ['completed', 'depleted', 'issues'];
  filteredStatus: string[] = [];

  ngOnInit() {

  }

}
