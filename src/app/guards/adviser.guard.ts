import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdviserGuard implements CanActivate {

  user!: User;
  role!: string;

  utilsService = inject(UtilsService);
  userService = inject(UserService);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = await this.userService.getUserByUid(this.utilsService.getUserUid()) as User;
    this.role = this.user.role;

    if (this.role == "adviser" || this.role == "admin") {
        return true;

    } else {
        this.utilsService.routerLink("/home/unauthorized");
        return false;
        
    }
  }

}