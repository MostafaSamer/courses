import { Injectable } from '@angular/core';
import { ConfigVariables } from './config'
import { HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
      private http: HttpClient,
  ) { }

  //*************************
  // USER //
  //*************************
  public login(email, pass) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/login`, {
          'email': email,
          'pass': pass
      }).pipe(map((res: any)=> {
          return res;
      }))
  }

}
