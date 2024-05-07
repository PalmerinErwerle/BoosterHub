import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
