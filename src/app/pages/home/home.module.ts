import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MythicComponent } from './mythic/mythic.component';
import { BoosterComponent } from './booster/booster.component';
import { AdviserComponent } from './adviser/adviser.component';
import { AdminComponent } from './admin/admin.component';

import { MenuButtonsComponent } from 'src/app/components/menu-buttons/menu-buttons.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { MythicListComponent } from 'src/app/components/mythic-list/mythic-list.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MythicComponent,
    BoosterComponent,
    AdviserComponent,
    AdminComponent,
    LoaderComponent,
    MenuButtonsComponent,
    UserListComponent,
    MythicListComponent
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
