import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from 'src/app/material.module';
import { AdviserComponent } from './adviser/adviser.component';
import { AdminComponent } from './admin/admin.component';
import { BoosterComponent } from './booster/booster.component';

import { MenuButtonsComponent } from 'src/app/components/menu-buttons/menu-buttons.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';


@NgModule({
  declarations: [
    ProfileComponent,
    BoosterComponent,
    AdviserComponent,
    AdminComponent,
    LoaderComponent,
    MenuButtonsComponent,
    UserListComponent
  ],
  providers: [
      MenuButtonsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
