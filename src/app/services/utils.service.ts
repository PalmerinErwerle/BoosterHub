import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    router = inject(Router);

    // Routing
    routerLink(url: string) {
        return this.router.navigateByUrl(url);
    }

    //Routing reload
    reload(url: string, time: number) {
        setTimeout(() => {
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
                this.router.navigate([url]);
            }); 
          }, time);
    }

    // LocalStorage POST
    saveInLocalStorage(key: string, value: any) {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    // LocalStorage GET
    getFromLocalStorage(key: string) {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }

    // LocalStorage Check
    isLoggedIn() {
        return localStorage.getItem('user');
    }
    
    // LocalStorage GET UID
    getUserUid() {
        let localUser = this.getFromLocalStorage('user');
        let uid = localUser.uid;
        return uid;
      }

}