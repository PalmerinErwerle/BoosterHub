import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mythic-form',
  templateUrl: './mythic-form.component.html',
  styleUrls: ['./mythic-form.component.scss']
})
export class MythicFormComponent {

  modalRef = inject(MatDialogRef<MythicFormComponent>);



}
