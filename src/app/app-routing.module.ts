import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

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
    path: '**',
    redirectTo: 'home/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
