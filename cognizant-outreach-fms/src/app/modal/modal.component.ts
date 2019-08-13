import { Component, Inject, Input } from '@angular/core';
import { DialogData } from '../shared/model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  status: File;
  statusMessage: string;
  isSuccess: boolean;
  isError: boolean;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFilePath(event: Event) {
    let uploadName = (<HTMLInputElement>event.target).files[0].name;
    let files = (<HTMLInputElement>event.target).files;
    switch (uploadName !== undefined && uploadName !== '') {
      case uploadName === 'OutReach Event Information.xlsx':
      case uploadName === 'Outreach Events Summary.xlsx':
      case uploadName === 'Volunteer_Enrollment Details_Not_Attend.xlsx':
      case uploadName === 'Volunteer_Enrollment Details_Unregistered.xlsx': {
        this.isSuccess = true;
        this.status = files.item(0);
        this.statusMessage = "Looks Good! Your document is ready to proceed further!"
        break;
      }
      default: {
        this.isError = true;
        this.statusMessage = "Ahh, You missed to see the note! Please upload correct format."
        break;
      }
    }
  }
}
