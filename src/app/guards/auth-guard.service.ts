import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise((resolve, reject) => {
				if (localStorage.getItem('currentUser')) {
					//this.router.navigate(['home/dashboard']);
					resolve(true);
				} else {
					console.log('User is not logged in');
					this.router.navigate(['/login']);
					resolve(false);
				}
		});
	}

	ifLoggedIn(){

	}
}
