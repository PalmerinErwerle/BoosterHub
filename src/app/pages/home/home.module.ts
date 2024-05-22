import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MythicComponent } from './mythic/mythic.component';
import { RaidComponent } from './raid/raid.component';
import { BoosterComponent } from './booster/booster.component';
import { AdviserComponent } from './adviser/adviser.component';
import { AdminComponent } from './admin/admin.component';

import { MenuButtonsComponent } from 'src/app/components/menu-buttons/menu-buttons.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { MythicListComponent } from 'src/app/components/mythic-list/mythic-list.component';
import { RaidListComponent } from 'src/app/components/raid-list/raid-list.component';
import { LegacyListComponent } from 'src/app/components/legacy-list/legacy-list.component';
import { LegacyComponent } from './legacy/legacy.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MythicComponent,
    RaidComponent,
    LegacyComponent,
    BoosterComponent,
    AdviserComponent,
    AdminComponent,
    LoaderComponent,
    MenuButtonsComponent,
    UserListComponent,
    MythicListComponent,
    RaidListComponent,
    LegacyListComponent
  ],
  providers: [
      MenuButtonsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class HomeModule { }
