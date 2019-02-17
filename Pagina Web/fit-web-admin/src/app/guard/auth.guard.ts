import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router) {}
    canActivate() {
        try {
            if (localStorage.getItem('currentUser')) {
                // logged in so return true
                return true;
            }
            // not logged in so redirect to login page
            this.router.navigateByUrl('/signin');
            return false;
        } catch (e) {
            alert('Sorry, your browser is not supported by this app. If you are using safari with private mode, please close the mode first');
        }
    }
}