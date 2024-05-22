import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Legacy } from 'src/app/models/legacy.model';
import { LegacyService } from 'src/app/services/legacy.service';

@Component({
  selector: 'app-complete-legacy-form',
  templateUrl: './complete-legacy-form.component.html',
  styleUrls: ['./complete-legacy-form.component.scss']
})
export class CompleteLegacyFormComponent implements OnInit {

  modalRef = inject(MatDialogRef<CompleteLegacyFormComponent>);
  legacy = inject(MAT_DIALOG_DATA).legacy as Legacy;
  legacyService = inject(LegacyService);
  
  @ViewChild('inputStatus') inputStatus!: ElementRef<HTMLInputElement>;

  status = ['completed', 'depleted', 'issues'];
  filteredStatus: string[] = [];

  form = new FormGroup({
    id: new FormControl(''),
    raid_name: new FormControl(''),
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
    this.form.controls.id.setValue(this.legacy.id);
    this.form.controls.raid_name.setValue(this.legacy.raid_name);
    this.form.controls.tank1_id.setValue(this.legacy.tank1_id);
    this.form.controls.tank2_id.setValue(this.legacy.tank2_id);
    this.form.controls.healer1_id.setValue(this.legacy.healer1_id);
    this.form.controls.healer2_id.setValue(this.legacy.healer2_id);
    this.form.controls.dps1_id.setValue(this.legacy.dps1_id);
    this.form.controls.dps2_id.setValue(this.legacy.dps2_id);
    this.form.controls.dps3_id.setValue(this.legacy.dps3_id);
    this.form.controls.dps4_id.setValue(this.legacy.dps4_id);
    this.form.controls.dps5_id.setValue(this.legacy.dps5_id);
    this.form.controls.dps6_id.setValue(this.legacy.dps6_id);
    this.form.controls.adviser_id.setValue(this.legacy.adviser_id);
    this.form.controls.description.setValue(this.legacy.description);
    this.form.controls.price.setValue(this.legacy.price as unknown as string);
  }

  submit() {
    this.legacyService.updateRaid(this.form, this.legacy.id);
  }

  filterStatus() {
    const filterValue = this.inputStatus.nativeElement.value.toLowerCase();
    this.filteredStatus = this.status.filter(o => o.toLowerCase().includes(filterValue));
  }

}
