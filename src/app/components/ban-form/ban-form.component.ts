import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ban-form',
  templateUrl: './ban-form.component.html',
  styleUrls: ['./ban-form.component.scss']
})
export class BanFormComponent implements OnInit {

  modalRef = inject(MatDialogRef<BanFormComponent>);
  user = inject(MAT_DIALOG_DATA).user as User;
  userService = inject(UserService);
  
  @ViewChild('inputStatus') inputStatus!: ElementRef<HTMLInputElement>;

  form = new FormGroup({
    ban_message: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    console.log(this.user.character_name);
  }

  submit() {
    this.user.ban_message = this.form.value.ban_message as string;
    this.userService.updateUserRole(this.user, "banned");
  }

}
