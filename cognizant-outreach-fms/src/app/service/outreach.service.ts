import { Injectable } from '@angular/core';
import { Authentication, Feedback, UniqueItems, Role } from '../shared/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const host = "http://localhost:57051";
//const host = "https://hack572363.azurewebsites.net";

@Injectable({
  providedIn: 'root'
})
export class OutreachService {
  public feedbackStatus: boolean = false;
  public api: string = host;
  private http: HttpClient;
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.http = _http;
    this.apiUrl = host;
  }

  /* Application Login entry */
  public appLogin(userInfo: Authentication): any {
    this.apiUrl = host + '/api/Config/Login';
    return this.http.post(this.apiUrl, userInfo, header)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Get event details of all users */
  public getFeedbackDetails(): any {
    this.apiUrl = host + '/api/Feedback/GetAllFeedbackDetails';
    return this.http.get(this.apiUrl);
  }

  /* Get Registered and Particpated Users */
  public getParticipatedUser(): any {
    this.apiUrl = host + '/api/Dashboard/GetParticipatedData';
    return this.http.get(this.apiUrl)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Get Registered but Not Particpated Users */
  public getNotParticipatedUser(): any {
    this.apiUrl = host + '/api/Dashboard/GetNotAttendedVolunteers';
    return this.http.get(this.apiUrl)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Get Un Registered Users */
  public getUnRegisteredUser(): any {
    this.apiUrl = host + '/api/Dashboard/GetUnRegisteredVolunteers';
    return this.http.get(this.apiUrl)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Get POC Users */
  public getPocDetails(): any {
    this.apiUrl = host + '/api/Dashboard/GetPOCDetails';
    return this.http.get(this.apiUrl);
  }

  /* Get Excel Report */
  public getExcel(type: string): any {
    this.apiUrl = host + '/api/dashboard/ExportToExcel?name=' + type;
    return this.http.get(this.apiUrl)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

  /* Import Excel Report */
  public postExcel(file: File): any {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'enctype': 'multipart/form-data' });
    this.apiUrl = host + '/api/dashboard/Import';

    var formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }
}
