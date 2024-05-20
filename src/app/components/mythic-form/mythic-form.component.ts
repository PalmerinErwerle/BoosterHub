import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
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
  
  @ViewChild('inputRunLevel') inputRunLevel!: ElementRef<HTMLInputElement>;
  @ViewChild('inputRunNumber') inputRunNumber!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTank') inputTank!: ElementRef<HTMLInputElement>;
  @ViewChild('inputHealer') inputHealer!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps1') inputDps1!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps2') inputDps2!: ElementRef<HTMLInputElement>;

  runLevels = ['+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+10', 'DotI HardMode'];
  filteredRunLevels: string[] = [];
  
  runNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
  filteredRunNumbers: string[] = [];

  users!: User[];
  characters: string[] = [];
  filteredCharacters: string[] = [];

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

    this.userService.getUsers().then(async (users) => {
      this.users = users;
      for (const u of users) {
        const character = u.character_name + "-" + u.character_realm;
        this.characters.push(character);
      }
    });
    
  }

  submit() {
    const tank_character = this.form.value.tank_id as string;
    const healer_character = this.form.value.healer_id as string;
    const dps1_character = this.form.value.dps1_id as string;
    const dps2_character = this.form.value.dps2_id as string;

    const [tankName, tankRealm] = tank_character.split('-');
    const [healerName, healerRealm] = healer_character.split('-');
    const [dps1Name, dps1Realm] = dps1_character.split('-');
    const [dps2Name, dps2Realm] = dps2_character.split('-');

    const tankUser = this.users.find(user => user.character_name === tankName && user.character_realm === tankRealm) as User;
    const healerUser = this.users.find(user => user.character_name === healerName && user.character_realm === healerRealm) as User;
    const dps1User = this.users.find(user => user.character_name === dps1Name && user.character_realm === dps1Realm) as User;
    const dps2User = this.users.find(user => user.character_name === dps2Name && user.character_realm === dps2Realm) as User;

    const tankUid = tankUser.uid;
    const healerUid = healerUser.uid;
    const dps1Uid = dps1User.uid;
    const dps2Uid = dps2User.uid;

    this.form.patchValue({
      tank_id: tankUid,
      healer_id: healerUid,
      dps1_id: dps1Uid,
      dps2_id: dps2Uid
    });

    this.mythicService.createMythic(this.form);
    this.form.reset();
  }

  filterRunLevel() {
    const filterValue = this.inputRunLevel.nativeElement.value.toLowerCase();
    this.filteredRunLevels = this.runLevels.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterRunNumber() {
    const filterValue = this.inputRunNumber.nativeElement.value.toLowerCase();
    this.filteredRunNumbers = this.runNumbers.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterTank() {
    const filterValue = this.inputTank.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterHealer() {
    const filterValue = this.inputHealer.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterDps1() {
    const filterValue = this.inputDps1.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterDps2() {
    const filterValue = this.inputDps2.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

}
