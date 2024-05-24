import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DeniedGuard implements CanActivate {

  user!: User;
  role!: string;

  utilsService = inject(UtilsService);
  userService = inject(UserService);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.utilsService.isLoggedIn() != null) {
      this.user = await this.userService.getUserByUid(this.utilsService.getUserUid()) as User;
      this.role = this.user.role;

      if (this.role == "onHold") {
        this.utilsService.routerLink("/onHold");
        return false;

      } else if (this.role == "denied") {
        return true;

      } else if (this.role == "banned") {
        this.utilsService.routerLink("/banned");
        return false;

      } else {
        this.utilsService.routerLink("/home");
        return false;

      }

    } else {
      this.utilsService.routerLink("/auth");
      return false;
    }
  }

}