import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSonnerToaster } from 'ngx-sonner';

import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ToasterComponent } from './components/toaster/toaster.component';

import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MythicFormComponent } from './components/mythic-form/mythic-form.component';
import { CompleteMythicFormComponent } from './components/complete-mythic-form/complete-mythic-form.component';


const firebaseConfig = {
  apiKey: "AIzaSyA86qxyv-TB3wxEVx3jRHLLH7MzvlG7lNk",
  authDomain: "boosterhub-frodfer716.firebaseapp.com",
  projectId: "boosterhub-frodfer716",
  storageBucket: "boosterhub-frodfer716.appspot.com",
  messagingSenderId: "822863942503",
  appId: "1:822863942503:web:662b1662304b5f7c6955c2"
};


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        HomeComponent,
        SpinnerComponent,
        ToasterComponent,
        MythicFormComponent,
        CompleteMythicFormComponent
    ],
    providers: [
        SpinnerComponent,
        ToasterComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgxSpinnerModule,
        NgxSonnerToaster,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        HttpClientModule
    ]
})

export class AppModule { }
