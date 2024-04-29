import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  utilsService = inject(UtilsService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.utilsService.isLoggedIn() != null) {
      return true;
    } else {
      this.utilsService.routerLink("/auth");
      return false;
    }
  }

}