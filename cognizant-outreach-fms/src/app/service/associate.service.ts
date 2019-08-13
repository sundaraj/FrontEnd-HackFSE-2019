import { Injectable } from '@angular/core';
import { Feedback } from '../shared/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const host = "http://localhost:57051";
//const host = "https://hack572363.azurewebsites.net";

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  private http: HttpClient;
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.http = _http;
    this.apiUrl = host;
  }

  /* To check whether user submitted feedback or not*/
  public checkUserFeedbackStatus(id: number): any {
    this.apiUrl = host + '/api/Feedback/GetFeedbackDetailById/' + id;
    return this.http.get(this.apiUrl);
  }

  /* Submit user feedback on POST */
  public postUserFeedback(feedback: Feedback): any {
    this.apiUrl = host + '/api/Feedback/CollectFeedback';
    return this.http.post(this.apiUrl, feedback, header)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))) //...errors if any
  }

}
