import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLogin = true;
  isRegister = false;
  isForgotPassword = false;

  loginView() {
    this.isLogin = true;
    this.isRegister = false;
    this.isForgotPassword = false;
  }

  registerView() {
    this.isLogin = false;
    this.isRegister = true;
    this.isForgotPassword = false;
  }

  forgotPasswordView() {
    this.isLogin = false;
    this.isForgotPassword = true;
  }

}
