import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../shared/model';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',  
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  userInfo: Role;
  constructor(private router: Router) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  } 

  UserAction() {
    alert('Sorry dude, the page not yet implemented!');
  }

  getOut() {
    localStorage.clear();
    this.router.navigateByUrl('/Outreach');   
    this.router.navigate(['/view'], { replaceUrl: true });
  }
}
