import { Injectable } from '@angular/core';
import { Role, SendMailData } from '../shared/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const host = "http://localhost:57051";
//const host = "https://hack572363.azurewebsites.net";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http: HttpClient;
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.http = _http;
    this.apiUrl = host;
  }

  /* Admin Privileges/

  /* Get user role  */
  public getUserRole(empId: number): any {
    this.apiUrl = host + '/api/ConfigRoles/' + empId;
    return this.http.get(this.apiUrl);
  }

  /* Set new user role */
  public postUserRole(userRole: Role): any {
    this.apiUrl = host + '/api/ConfigRoles/';
    return this.http.post(this.apiUrl, userRole, header)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Update new user role */
  public putUserRole(): any {
    this.apiUrl = host + '/api/ConfigRoles/';
    return this.http.post(this.apiUrl, { header })
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Delete user role */
  public deleteUserRole(): any {
    this.apiUrl = host + '/api/ConfigRoles/';
    return this.http.post(this.apiUrl, { header })
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Send mail to users  */
  public postEmail(data: SendMailData[]): any {
    this.apiUrl = host + '/api/Mail/SendMail/';
    return this.http.post(this.apiUrl, data, header);
  }
}
