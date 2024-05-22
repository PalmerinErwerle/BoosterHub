import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Raid } from 'src/app/models/raid.model';
import { RaidService } from 'src/app/services/raid.service';

@Component({
  selector: 'app-complete-raid-form',
  templateUrl: './complete-raid-form.component.html',
  styleUrls: ['./complete-raid-form.component.scss']
})
export class CompleteRaidFormComponent implements OnInit {

  modalRef = inject(MatDialogRef<CompleteRaidFormComponent>);
  raid = inject(MAT_DIALOG_DATA).raid as Raid;
  raidService = inject(RaidService);
  
  @ViewChild('inputStatus') inputStatus!: ElementRef<HTMLInputElement>;

  status = ['completed', 'depleted', 'issues'];
  filteredStatus: string[] = [];

  form = new FormGroup({
    id: new FormControl(''),
    raid_level: new FormControl(''),
    tank1_id: new FormControl(''),
    tank2_id: new FormControl(''),
    healer1_id: new FormControl(''),
    healer2_id: new FormControl(''),
    dps1_id: new FormControl(''),
    dps2_id: new FormControl(''),
    dps3_id: new FormControl(''),
    dps4_id: new FormControl(''),
    dps5_id: new FormControl(''),
    dps6_id: new FormControl(''),
    adviser_id: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    
    status: new FormControl('', [Validators.required]),
    feedback: new FormControl('', [Validators.required]),
    logs_link: new FormControl('')
  })

  ngOnInit() {
    this.form.controls.id.setValue(this.raid.id);
    this.form.controls.raid_level.setValue(this.raid.raid_level);
    this.form.controls.tank1_id.setValue(this.raid.tank1_id);
    this.form.controls.tank2_id.setValue(this.raid.tank2_id);
    this.form.controls.healer1_id.setValue(this.raid.healer1_id);
    this.form.controls.healer2_id.setValue(this.raid.healer2_id);
    this.form.controls.dps1_id.setValue(this.raid.dps1_id);
    this.form.controls.dps2_id.setValue(this.raid.dps2_id);
    this.form.controls.dps3_id.setValue(this.raid.dps3_id);
    this.form.controls.dps4_id.setValue(this.raid.dps4_id);
    this.form.controls.dps5_id.setValue(this.raid.dps5_id);
    this.form.controls.dps6_id.setValue(this.raid.dps6_id);
    this.form.controls.adviser_id.setValue(this.raid.adviser_id);
    this.form.controls.description.setValue(this.raid.description);
    this.form.controls.price.setValue(this.raid.price as unknown as string);
  }

  submit() {
    this.raidService.updateRaid(this.form, this.raid.id);
  }

  filterStatus() {
    const filterValue = this.inputStatus.nativeElement.value.toLowerCase();
    this.filteredStatus = this.status.filter(o => o.toLowerCase().includes(filterValue));
  }

}
