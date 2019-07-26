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

  addStudent(fname: string, lname: string, email: string, contact: string, country: string, high_degree: string,
    high_dtype: string, high_degree_score: string, high_degree_stype: string, uwid: string, uw_degree_type: string,
    uw_score: string, uw_stype: string) {
    return this.http.post<any>('http://10.242.16.193:8042/users/signin', { fname, lname, email, contact, country, high_degree,
        high_dtype, high_degree_score, high_degree_stype, uwid, uw_degree_type, uw_score, uw_stype})
        .pipe(map(response => {
          console.log('Success');
            // login successful if there's a user in the response
            if (response) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                console.log(response);
                //localStorage.setItem('currentUser', JSON.stringify(user.data));
            }
            return response;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
