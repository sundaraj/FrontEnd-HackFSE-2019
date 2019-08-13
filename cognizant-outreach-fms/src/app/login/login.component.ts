import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Authentication, Role } from '../shared/model';
import { ErrorStateMatcher } from '@angular/material/core';
import { OutreachService } from '../service/outreach.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  auth: Authentication;
  isError: boolean;
  pocUsers: any[];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private _OutreachService: OutreachService) {
    this.auth = new Authentication();
  }

  ngOnInit() {
    this.isError = false;
  }

  public getIn(username: number, password: string) {
    this.auth.UserName = username;
    this.auth.Password = password;

    this._OutreachService.appLogin(this.auth).subscribe((response: Role) => {
      if (response) {
        localStorage.setItem("userInfo", JSON.stringify(response));
        this.router.navigateByUrl('/home');
      }
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }
}
