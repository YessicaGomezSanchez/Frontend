import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css']
})
export class ToastrComponent implements OnInit {

  constructor(public toastr: ToastrManager) { }

  ngOnInit() {
  }
  
  showSuccess(message: string, title: string) {
    this.toastr.successToastr(message, title);
  }

  showError(message: string, title: string) {

    this.toastr.errorToastr(message, title);
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  showInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
  }

  // showCustom() {
  //     this.toastr.customToastr('<span style='color: green; font-size: 16px; text-align: center;'>Custom Toast</span>', null,
  //     { enableHTML: true }
  //     );
  // }

  showToast(position: any = 'top-down') {
    this.toastr.infoToastr('This is a toast.', 'Toast', {
      position: position
    });
  }
}
