import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  utilsService = inject(UtilsService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.utilsService.isLoggedIn() == null) {
      return true;
    } else {
      this.utilsService.routerLink("/home");
      return false;
    }
  }

}