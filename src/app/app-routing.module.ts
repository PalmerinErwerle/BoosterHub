import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { OnHoldComponent } from './pages/on-hold/on-hold.component';
import { DeniedComponent } from './pages/denied/denied.component';
import { BannedComponent } from './pages/banned/banned.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { OnHoldGuard } from './guards/on-hold.guard';
import { DeniedGuard } from './guards/denied.guard';
import { BannedGuard } from './guards/banned.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'auth',
    component:AuthComponent,
    canActivate:[NoAuthGuard]
  },
  {
    path: 'onHold',
    component:OnHoldComponent,
    canActivate:[OnHoldGuard]
  },
  {
    path: 'denied',
    component:DeniedComponent,
    canActivate:[DeniedGuard]
  },
  {
    path: 'banned',
    component:BannedComponent,
    canActivate:[BannedGuard]
  },
  {
    path: '**',
    redirectTo: 'home/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
