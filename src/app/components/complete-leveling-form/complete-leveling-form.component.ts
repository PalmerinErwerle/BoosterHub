import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Leveling } from 'src/app/models/leveling.model';
import { LevelingService } from 'src/app/services/leveling.service';

@Component({
  selector: 'app-complete-leveling-form',
  templateUrl: './complete-leveling-form.component.html',
  styleUrls: ['./complete-leveling-form.component.scss']
})
export class CompleteLevelingFormComponent {

  modalRef = inject(MatDialogRef<CompleteLevelingFormComponent>);
  leveling = inject(MAT_DIALOG_DATA).leveling as Leveling;
  levelingService = inject(LevelingService);
  
  @ViewChild('inputStatus') inputStatus!: ElementRef<HTMLInputElement>;

  status = ['completed', 'depleted', 'issues'];
  filteredStatus: string[] = [];

  form = new FormGroup({
    id: new FormControl(''),
    run_level: new FormControl(''),
    run_number: new FormControl(''),
    booster_id: new FormControl(''),
    adviser_id: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    
    status: new FormControl('', [Validators.required]),
    feedback: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    this.form.controls.id.setValue(this.leveling.id);
    this.form.controls.run_level.setValue(this.leveling.level_range);
    this.form.controls.booster_id.setValue(this.leveling.booster_id);
    this.form.controls.adviser_id.setValue(this.leveling.adviser_id);
    this.form.controls.description.setValue(this.leveling.description);
    this.form.controls.price.setValue(this.leveling.price as unknown as string);
  }

  submit() {
    this.levelingService.updateLeveling(this.form, this.leveling.id);
  }

  filterStatus() {
    const filterValue = this.inputStatus.nativeElement.value.toLowerCase();
    this.filteredStatus = this.status.filter(o => o.toLowerCase().includes(filterValue));
  }

}
