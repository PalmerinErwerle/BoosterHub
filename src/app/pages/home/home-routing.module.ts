import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { BoosterComponent } from './booster/booster.component';
import { AdviserComponent } from './adviser/adviser.component';
import { AdminComponent } from './admin/admin.component';
import { MythicComponent } from './mythic/mythic.component';
import { RaidComponent } from './raid/raid.component';
import { LegacyComponent } from './legacy/legacy.component';
import { LevelingComponent } from './leveling/leveling.component';
import { StrikeComponent } from './strike/strike.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdviserGuard } from 'src/app/guards/adviser.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component:WelcomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/:uid',
        component:ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'mythic/:id',
        component:MythicComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'raid/:id',
        component:RaidComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'legacy/:id',
        component:LegacyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leveling/:id',
        component:LevelingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'strike/:id',
        component:StrikeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'booster-menu',
        component:BoosterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'adviser-menu',
        component:AdviserComponent,
        canActivate: [AuthGuard, AdviserGuard]
      },
      {
        path: 'admin-menu',
        component:AdminComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'unauthorized',
        component:UnauthorizedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'error',
        component:ErrorComponent,
        canActivate: [AuthGuard]
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
