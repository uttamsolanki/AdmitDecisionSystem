import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  url = "http://192.168.0.14:8042";
  constructor(private http: HttpClient) {
    
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.url+'/users/signin', { email, password })
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
    return this.http.post<any>(this.url+'/student/save', { fname, lname, email, contact, country, high_degree,
        high_dtype, high_degree_score, high_degree_stype, uwid, uw_degree_type, uw_score, uw_stype});
        // .pipe(map(response => {
        //   console.log('Success');
        //     // login successful if there's a user in the response
        //     if (response) {
        //         // store user details and basic auth credentials in local storage 
        //         // to keep user logged in between page refreshes
        //         console.log(response);
        //         //localStorage.setItem('currentUser', JSON.stringify(user.data));
        //     }
        //     return response;
        // }));
  }

  listStudent(){
      return this.http.get(this.url+'/student');
  }
    // deleting student
  deleteStudent(id:string){
      return this.http.delete(this.url+'/student/'+id);
  }

  listStudentId(id:string){
    return this.http.get(this.url+'/student/'+id);
  }

  updateStudent(id:string,fname: string, lname: string, email: string, contact: string, country: string, high_degree: string,
    high_dtype: string, high_degree_score: string, high_degree_stype: string, uwid: string, uw_degree_type: string,
    uw_score: string, uw_stype: string){

      return this.http.put<any>(this.url+'/student/edit/'+id, { fname, lname, email, contact, country, high_degree,
        high_dtype, high_degree_score, high_degree_stype, uwid, uw_degree_type, uw_score, uw_stype});
        // .pipe(map(response => {
        //   console.log('Success');
        //     // login successful if there's a user in the response
        //     if (response) {
        //         // store user details and basic auth credentials in local storage 
        //         // to keep user logged in between page refreshes
        //         console.log(response);
        //         //localStorage.setItem('currentUser', JSON.stringify(user.data));
        //     }
        //     return response;
        // }));
  }

  listUniversity(){
    return this.http.get(this.url+'/student/university');
  }

  universityResult(uni:string){
    return this.http.post<any>(this.url+'/student/studentByUni', { uni });
      // .pipe(map(response => {
      //   console.log('Success');
      //     // login successful if there's a user in the response
      //     if (response) {
      //         // store user details and basic auth credentials in local storage 
      //         // to keep user logged in between page refreshes
      //         //console.log(response);
      //         //localStorage.setItem('currentUser', JSON.stringify(user.data));
      //     }
      //     return response;
      // }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
