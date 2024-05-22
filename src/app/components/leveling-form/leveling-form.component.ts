import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { LevelingService } from 'src/app/services/leveling.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-leveling-form',
  templateUrl: './leveling-form.component.html',
  styleUrls: ['./leveling-form.component.scss']
})
export class LevelingFormComponent implements OnInit {

  @ViewChild('inputLevelRange') inputLevelRange!: ElementRef<HTMLInputElement>;
  @ViewChild('inputBooster') inputBooster!: ElementRef<HTMLInputElement>;

  levelRanges = ['1-60', '1-70', '8-60', '8-70', '10-60', '10-70', '60-70'];
  filteredLevelRanges: string[] = [];

  users!: User[];
  characters: string[] = [];
  filteredCharacters: string[] = [];

  form = new FormGroup({
    id: new FormControl(''),

    level_range: new FormControl('', [Validators.required]),
    
    booster_id: new FormControl('', [Validators.required]),
    adviser_id: new FormControl(''),
    
    status: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    
    price: new FormControl('', [Validators.required]),
  })

  modalRef = inject(MatDialogRef<LevelingFormComponent>);
  userService = inject(UserService);
  levelingService = inject(LevelingService);
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
    const booster_character = this.form.value.booster_id as string;

    const [boosterName, boosterRealm] = booster_character.split('-');

    const boosterUser = this.users.find(user => user.character_name === boosterName && user.character_realm === boosterRealm) as User;

    const boosterUid = boosterUser.uid;

    this.form.patchValue({
      booster_id: boosterUid
    });

    this.levelingService.createLeveling(this.form);
  }

  filterLevelRange() {
    const filterValue = this.inputLevelRange.nativeElement.value.toLowerCase();
    this.filteredLevelRanges = this.levelRanges.filter(o => o.toLowerCase().includes(filterValue));
  }

  filterBooster() {
    const filterValue = this.inputBooster.nativeElement.value.toLowerCase();
    this.filteredCharacters = this.characters.filter(o => o.toLowerCase().includes(filterValue));
  }

}
