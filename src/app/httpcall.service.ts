import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './users'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpcallService {

  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<Users[]> { 
    /*let httpHeaders= new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT'
    }); */
    return this.httpClient.get<Users[]>('https://reqres.in/api/users');
  }

  getuser(id: string):Observable<Users[]> {
    return this.httpClient.get<Users[]>('https://reqres.in/api/users/'+id)
  }

  /*addUser(userdet: { first_name: any; last_name: any; email: any; avatar: any; }) :Observable<Users[]> {
    return this.httpClient.post<Users[]>('https://reqres.in/api/users' , userdet);
  } */

  //post method accept an object of type post and return an observable
  post(user:Users): Observable<any>{
    return this.httpClient.post('https://reqres.in/api/users' , user);
  }

  //put method
  put(user:Users) :Observable<any>{
    return this.httpClient.put('https://reqres.in/api/users/4' , user);
  }
  //patch method
  patch(user:Users) :Observable<any> {
    return this.httpClient.patch('https://reqres.in/api/users/2' , user);
  }
  
  //delete method
  delete(): Observable<any>{
    return this.httpClient.delete('https://reqres.in/api/users/6');
  }
}
