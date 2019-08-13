import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OutreachService } from '../service/outreach.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'our story to inspire others';
  thankPage: boolean;
  isPlay: boolean = true;
  @ViewChild('thankCard') thankElement: ElementRef;
  @ViewChild('teaser') videoElement: ElementRef;
  @ViewChild('teaser1') videoElement1: ElementRef;

  constructor(private _outreach: OutreachService) { }

  ngOnInit() {
    this.thankPage = this._outreach.feedbackStatus;
    this.videoElement.nativeElement.muted = true;
    this.videoElement1.nativeElement.muted = true;

    if (this._outreach.feedbackStatus) {
      let element = this.thankElement.nativeElement;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    this._outreach.feedbackStatus = false;
  }

  // startPlay() {
  //   this.videoElement.nativeElement.play();
  //   this.videoElement1.nativeElement.play();
  //   this.isPlay = true;
  // }
}
