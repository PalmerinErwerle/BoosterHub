import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {

  protected readonly toast = toast;

  successToast(msg: string) {
    toast.success(msg);
  }

  errorToast(msg: string) {
    toast.error(msg);
  }

}
