import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { BoosterComponent } from './booster/booster.component';
import { AdviserComponent } from './adviser/adviser.component';
import { AdminComponent } from './admin/admin.component';
import { MythicComponent } from './mythic/mythic.component';
import { RaidComponent } from './raid/raid.component';
import { LegacyComponent } from './legacy/legacy.component';
import { LevelingComponent } from './leveling/leveling.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component:WelcomeComponent
      },
      {
        path: 'profile/:uid',
        component:ProfileComponent
      },
      {
        path: 'mythic/:id',
        component:MythicComponent
      },
      {
        path: 'raid/:id',
        component:RaidComponent
      },
      {
        path: 'legacy/:id',
        component:LegacyComponent
      },
      {
        path: 'leveling/:id',
        component:LevelingComponent
      },
      {
        path: 'booster-menu',
        component:BoosterComponent
      },
      {
        path: 'adviser-menu',
        component:AdviserComponent
      },
      {
        path: 'admin-menu',
        component:AdminComponent
      },
      {
        path: 'error',
        component:ErrorComponent
      },
      {
        path: '**',
        redirectTo: 'error'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
