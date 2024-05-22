import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { RaidService } from 'src/app/services/raid.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-raid-form',
  templateUrl: './raid-form.component.html',
  styleUrls: ['./raid-form.component.scss']
})
export class RaidFormComponent implements OnInit {

  @ViewChild('inputRaidLevel') inputRaidLevel!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTank1') inputTank1!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTank2') inputTank2!: ElementRef<HTMLInputElement>;
  @ViewChild('inputHealer1') inputHealer1!: ElementRef<HTMLInputElement>;
  @ViewChild('inputHealer2') inputHealer2!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps1') inputDps1!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps2') inputDps2!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps3') inputDps3!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps4') inputDps4!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps5') inputDps5!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDps6') inputDps6!: ElementRef<HTMLInputElement>;

  raidLevels = ['VOTI', 'VOTI VIP', 'ATSC', 'Aberrus VIP', 'ATDH', 'ATDH VIP'];
  filteredRaidLevels: string[] = [];

  users!: User[];
  characters: string[] = [];
  filteredCharacters: string[] = [];

  form = new FormGroup({
    id: new FormControl(''),

    raid_level: new FormControl('', [Validators.required]),
    
    tank1_id: new FormControl('', [Validators.required]),
    tank2_id: new FormControl('', [Validators.required]),
    healer1_id: new FormControl('', [Validators.required]),
    healer2_id: new FormControl('', [Validators.required]),
    dps1_id: new FormControl('', [Validators.required]),
    dps2_id: new FormControl('', [Validators.required]),
    dps3_id: new FormControl('', [Validators.required]),
    dps4_id: new FormControl('', [Validators.required]),
    dps5_id: new FormControl('', [Validators.required]),
    dps6_id: new FormControl('', [Validators.required]),
    adviser_id: new FormControl(''),
    
    status: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    
    price: new FormControl('', [Validators.required]),
  })

  modalRef = inject(MatDialogRef<RaidFormComponent>);
  userService = inject(UserService);
  raidService = inject(RaidService);
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
    const tank1_character = this.form.value.tank1_id as string;
    const tank2_character = this.form.value.tank2_id as string;
    const healer1_character = this.form.value.healer1_id as string;
    const healer2_character = this.form.value.healer2_id as string;
    const dps1_character = this.form.value.dps1_id as string;
    const dps2_character = this.form.value.dps2_id as string;
    const dps3_character = this.form.value.dps3_id as string;
    const dps4_character = this.form.value.dps4_id as string;
    const dps5_character = this.form.value.dps5_id as string;
    const dps6_character = this.form.value.dps6_id as string;

    const [tank1Name, tank1Realm] = tank1_character.split('-');
    const [tank2Name, tank2Realm] = tank2_character.split('-');
    const [healer1Name, healer1Realm] = healer1_character.split('-');
    const [healer2Name, healer2Realm] = healer2_character.split('-');
    const [dps1Name, dps1Realm] = dps1_character.split('-');
    const [dps2Name, dps2Realm] = dps2_character.split('-');
    const [dps3Name, dps3Realm] = dps3_character.split('-');
    const [dps4Name, dps4Realm] = dps4_character.split('-');
    const [dps5Name, dps5Realm] = dps5_character.split('-');
    const [dps6Name, dps6Realm] = dps6_character.split('-');

    const tank1User = this.users.find(user => user.character_name === tank1Name && user.character_realm === tank1Realm) as User;
    const tank2User = this.users.find(user => user.character_name === tank2Name && user.character_realm === tank2Realm) as User;
    const healer1User = this.users.find(user => user.character_name === healer1Name && user.character_realm === healer1Realm) as User;
    const healer2User = this.users.find(user => user.character_name === healer2Name && user.character_realm === healer2Realm) as User;
    const dps1User = this.users.find(user => user.character_name === dps1Name && user.character_realm === dps1Realm) as User;
    const dps2User = this.users.find(user => user.character_name === dps2Name && user.character_realm === dps2Realm) as User;
    const dps3User = this.users.find(user => user.character_name === dps3Name && user.character_realm === dps3Realm) as User;
    const dps4User = this.users.find(user => user.character_name === dps4Name && user.character_realm === dps4Realm) as User;
    const dps5User = this.users.find(user => user.character_name === dps5Name && user.character_realm === dps5Realm) as User;
    const dps6User = this.users.find(user => user.character_name === dps6Name && user.character_realm === dps6Realm) as User;

    const tank1Uid = tank1User.uid;
    const tank2Uid = tank2User.uid;
    const healer1Uid = healer1User.uid;
    const healer2Uid = healer2User.uid;
    const dps1Uid = dps1User.uid;
    const dps2Uid = dps2User.uid;
    const dps3Uid = dps3User.uid;
    const dps4Uid = dps4User.uid;
    const dps5Uid = dps5User.uid;
    const dps6Uid = dps6User.uid;

    this.form.patchValue({
      tank1_id: tank1Uid,
      tank2_id: tank2Uid,
      healer1_id: healer1Uid,
      healer2_id: healer2Uid,
      dps1_id: dps1Uid,
      dps2_id: dps2Uid,
      dps3_id: dps3Uid,
      dps4_id: dps4Uid,
      dps5_id: dps5Uid,
      dps6_id: dps6Uid
    });

    this.raidService.createRaid(this.form);
  }

  filterRaidLevel() {
    const filterValue = this.inputRaidLevel.nativeElement.value.toLowerCase();
    this.filteredRaidLevels = this.raidLevels.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterTank1() {
    const filterValue = this.inputTank1.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterTank2() {
    const filterValue = this.inputTank2.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterHealer1() {
    const filterValue = this.inputHealer1.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterHealer2() {
    const filterValue = this.inputHealer2.nativeElement.value.toLowerCase();
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

  filterDps3() {
    const filterValue = this.inputDps3.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterDps4() {
    const filterValue = this.inputDps4.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterDps5() {
    const filterValue = this.inputDps5.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterDps6() {
    const filterValue = this.inputDps6.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

}
