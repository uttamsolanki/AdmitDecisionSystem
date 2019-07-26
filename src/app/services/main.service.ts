import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
    
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://10.242.16.193:8042/users/signin', { email, password })
        .pipe(map(user => {
          console.log('Success');
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(email + ':' + password);
                console.log(user);
                console.log(user.data);
                localStorage.setItem('currentUser', JSON.stringify(user.data));
            }
            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
