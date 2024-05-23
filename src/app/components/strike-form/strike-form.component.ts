import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StrikeService } from 'src/app/services/strike.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-strike-form',
  templateUrl: './strike-form.component.html',
  styleUrls: ['./strike-form.component.scss']
})
export class StrikeFormComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    
    striked_id: new FormControl(''),
    admin_id: new FormControl(''),
    
    status: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    
    penalty: new FormControl('', [Validators.required])
  })

  modalRef = inject(MatDialogRef<StrikeFormComponent>);
  striked_id = inject(MAT_DIALOG_DATA).striked_id as string;

  strikeService = inject(StrikeService);
  userService = inject(UserService);
  utilsService = inject(UtilsService);

  async ngOnInit() {
    let strikedUser = await this.userService.getUserByUid(this.striked_id);

    this.form.controls.striked_id.setValue(strikedUser!.uid);
    this.form.controls.admin_id.setValue(this.utilsService.getUserUid());
    this.form.controls.status.setValue("unpaid");
  }

  submit() {
    this.strikeService.createStrike(this.form);
  }

}
