import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AssociateService } from '../service/associate.service';
import { OutreachService } from '../service/outreach.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { Role, Feedback, DialogData } from '../shared/model';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  userInfo: Role;
  userFeedback: Feedback;
  actualDate: string;
  areaOfImprovemnt: string;
  reasonToUnregister: string;
  isType: string = '';
  isFeedbackSubmitted: boolean;
  message: string;
  selectedValue: string;
  userStory: string;
  isSuccess: boolean;
  isError: boolean;
  reasons: string[] = ['Personal Commitment', 'Official Work', 'Event Not What I Expected', 'No Communication About Event', 'Incorrectly Registered', 'Do Not Wish To Disclose'];

  constructor(private ngZone: NgZone, private _OutreachService: OutreachService, private _AssociateService: AssociateService, private _dialog: MatDialog, private _router: Router) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getFeedback();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getFeedback() {
    this.message = '';
    this.isFeedbackSubmitted = false;
    if (this.userInfo.Role === 'Associate') {
      this._AssociateService.checkUserFeedbackStatus(this.userInfo.UserName).subscribe((response: Feedback) => {
        if (response) {
          this.isFeedbackSubmitted = response.IsFeedbackCollected;
          if (!response.IsFeedbackCollected) {
            let date = response.EventDate.split("-");
            let newDate = new Date(date[1] + '-' + date[0] + '-' + date[2]);
            this.actualDate = newDate.toDateString();
            this.isType = response.EnrollmentType;
            this.userFeedback = response;
            console.log(response);
          } else {
            this.message = 'Dude, You already submitted feedback.!';
          }

        }
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
          this.message = 'Ahh! Something went wrong! Please try again after sometime.'
        });
    }
  }

  isSelected(value: string) {
    this.message = '';
    this.selectedValue = '';
    this.userFeedback.Rating = +value;

    switch (this.userFeedback.Rating > 0) {
      case this.userFeedback.Rating === 5: {
        this.selectedValue = 'Awesome! It Exceeds All My Expectations.';
        break;
      }
      case this.userFeedback.Rating === 4: {
        this.selectedValue = 'Superb! Exceeds Most Expectations.';
        break;
      }
      case this.userFeedback.Rating === 3: {
        this.selectedValue = 'Yeah Okay! Meets All Expectations.';
        break;
      }
      case this.userFeedback.Rating === 2: {
        this.selectedValue = 'Not Bad! Meets some Expectations';
        break;
      }
      case this.userFeedback.Rating === 1: {
        this.selectedValue = 'Mmmm Humm! No Comments, Simply Waste.';
        break;
      }
      default: {
        this.selectedValue = "";
        break;
      }
    }
  }

  participatedUser(rating: number, answer1: string, answer2: string) {
    let feedback = new Feedback();
    if (rating > 0) {
      feedback = this.userFeedback;
      feedback.Rating = +rating;
      feedback.FeedbackAnswers = [];
      feedback.FeedbackAnswers.push(answer1);
      feedback.FeedbackAnswers.push(answer2);
      this.openDialog();
      this._AssociateService.postUserFeedback(feedback).subscribe((response: Feedback) => {
        if (response === null) {
          this.isSuccess = true;
          console.log('Feedback Submitted Successfully!');
        }
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
        });
    }
    else {
      this.message = "Ahh! You missed something! Please give rating and try again."
    }
  }

  /* Common Resuable Logic for Unregistered and Not Participated Users */
  notAttended(improvement: string, selectedValue: string) {
    let feedback = new Feedback();
    if (selectedValue !== undefined && selectedValue !== '') {
      feedback = this.userFeedback;
      feedback.FeedbackAnswers.push("");
      feedback.FeedbackAnswers.push(improvement);
      feedback.SelectedFeedbackOption = selectedValue;
      this.openDialog();
      this._AssociateService.postUserFeedback(feedback).subscribe((response: Feedback) => {
        if (response === null) {
          this.isSuccess = true;
          console.log('Feedback Submitted Successfully!');
        }
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
        });
    }
    else {
      this.message = "Ahh! You missed something! Please select a valid option and try again."
    }

  }

  rest(value: any) {
    this.message = '';
  }

  openDialog(): void {
    let modalData = new DialogData();
    modalData.name = this.userInfo.Role;
    modalData.message = "Thanks for sharing the valuable feedack!"

    const dialogRef = this._dialog.open(ModalComponent, {
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      this._OutreachService.feedbackStatus = true;
      this.isFeedbackSubmitted = true;
      this._router.navigateByUrl('home');
      console.log('The dialog was closed');
    });
  }
}
