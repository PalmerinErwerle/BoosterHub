import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mythic } from 'src/app/models/mythic.model';
import { MythicService } from 'src/app/services/mythic.service';

@Component({
  selector: 'app-complete-mythic-form',
  templateUrl: './complete-mythic-form.component.html',
  styleUrls: ['./complete-mythic-form.component.scss']
})
export class CompleteMythicFormComponent implements OnInit {

  modalRef = inject(MatDialogRef<CompleteMythicFormComponent>);
  mythic = inject(MAT_DIALOG_DATA).mythic as Mythic;
  mythicService = inject(MythicService);
  
  @ViewChild('inputStatus') inputStatus!: ElementRef<HTMLInputElement>;

  status = ['completed', 'depleted', 'issues'];
  filteredStatus: string[] = [];

  form = new FormGroup({
    id: new FormControl(''),
    run_level: new FormControl(''),
    run_number: new FormControl(''),
    tank_id: new FormControl(''),
    healer_id: new FormControl(''),
    dps1_id: new FormControl(''),
    dps2_id: new FormControl(''),
    adviser_id: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    
    status: new FormControl('', [Validators.required]),
    feedback: new FormControl('', [Validators.required]),
    logs_link: new FormControl('')
  })

  ngOnInit() {
    this.form.controls.id.setValue(this.mythic.id);
    this.form.controls.run_level.setValue(this.mythic.run_level);
    this.form.controls.run_number.setValue(this.mythic.run_number as unknown as string);
    this.form.controls.tank_id.setValue(this.mythic.tank_id);
    this.form.controls.healer_id.setValue(this.mythic.healer_id);
    this.form.controls.dps1_id.setValue(this.mythic.dps1_id);
    this.form.controls.dps2_id.setValue(this.mythic.dps2_id);
    this.form.controls.adviser_id.setValue(this.mythic.adviser_id);
    this.form.controls.description.setValue(this.mythic.description);
    this.form.controls.price.setValue(this.mythic.price as unknown as string);
  }

  submit() {
    this.mythicService.updateMythic(this.form, this.mythic.id);
  }

  filterStatus() {
    const filterValue = this.inputStatus.nativeElement.value.toLowerCase();
    this.filteredStatus = this.status.filter(o => o.toLowerCase().includes(filterValue));
  }

}
