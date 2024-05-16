import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { MythicService } from 'src/app/services/mythic.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-mythic-form',
  templateUrl: './mythic-form.component.html',
  styleUrls: ['./mythic-form.component.scss']
})
export class MythicFormComponent implements OnInit {

  users!: User[];

  form = new FormGroup({
    id: new FormControl(''),

    run_level: new FormControl('', [Validators.required]),
    run_number: new FormControl('', [Validators.required]),
    
    tank_id: new FormControl('', [Validators.required]),
    healer_id: new FormControl('', [Validators.required]),
    dps1_id: new FormControl('', [Validators.required]),
    dps2_id: new FormControl('', [Validators.required]),
    adviser_id: new FormControl(''),
    
    status: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    
    price: new FormControl('', [Validators.required]),
  })

  modalRef = inject(MatDialogRef<MythicFormComponent>);
  userService = inject(UserService);
  mythicService = inject(MythicService);
  utilsService = inject(UtilsService);

  async ngOnInit() {
    this.form.controls.adviser_id.setValue(this.utilsService.getUserUid());
    this.form.controls.status.setValue("created");

    this.users = await this.userService.getUsers();
    
  }

  submit() {
    this.mythicService.createMythic(this.form);
  }

}
