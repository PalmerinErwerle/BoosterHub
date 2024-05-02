import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  spinner = inject(NgxSpinnerService);

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner(time: number) {
    setTimeout(() => {
      this.spinner.hide();
    }, time);
  }

}
