import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, PageEvent, Sort, MatSelectionListChange } from '@angular/material';
import { AdminService } from '../service/admin.service';
import { OutreachService } from '../service/outreach.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material';
import { Role, Feedback, ListOfInfo, RefinerData, UniqueItems, DialogData, POCInfo, SendMailData } from '../shared/model';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { PlatformReflectionCapabilities } from '@angular/core/src/reflection/platform_reflection_capabilities';
import { element } from 'protractor';
import { noUndefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public gridData: any;
  userInfo: Role;
  actualDate: string;
  isType: string = 'Feedback';
  allUserFeedback: Feedback[] = [];
  filteredUsers: UniqueItems[] = [];
  data: ListOfInfo[] = [];
  data1: RefinerData[] = [];
  mailList: SendMailData[] = [];
  empId: string;
  isLoad: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  errorMessage: string;
  pageEvent: PageEvent;

  displayedColumns: string[] = ['id', 'name', 'eventName', 'rating', 'location', 'project'];
  displayedColumns1: string[] = ['id', 'name', 'eventName', 'beneficiary', 'councilName', 'businessUnit', 'feedbackStatus'];
  displayedColumns2: string[] = ['id', 'eventName', 'eventDate', 'beneficiary', 'baselocation', 'feedbackStatus'];

  dataSource = new MatTableDataSource();
  sortedDataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  bcLabel1: string;
  bcLabel2: string;

  dcLabels: string[] = [];
  dcData: number[] = [];
  bcLabels: string[] = [];
  bcData: number[] = [];
  bcData1: number[] = [];
  typeOfUsers: { name: string; selected: boolean; }[] = [
    {
      name: 'Feedback',
      selected: true
    },
    {
      name: 'Participated',
      selected: false
    },
    {
      name: 'Not Participated',
      selected: false
    },
    {
      name: 'Unregistered',
      selected: false
    },
  ];
  panelOpenState = true;

  myControl = new FormControl();
  options: string[] = ['POC', 'PMO', 'Admin'];

  public ratings: any[] = [];
  public locationRatings: any[] = [];
  public location: any[] = [];
  public pocData: any[] = [];
  locations: any[] = [];
  totalHours: any[] = [];
  filteredBU: any[];
  businessUnit: any[] = [];
  feedbackSubmitted: any[] = [];
  constructor(private _OutreachService: OutreachService, private _AdminService: AdminService, private _dialog: MatDialog) {
  }

  ngOnInit() {
    this.message = '';
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getAllFeedback();
  }

  getPOCDetails() {
    this._OutreachService.getPocDetails().subscribe((response: POCInfo[]) => {
      if (response) {
        let pocdata = response;
        pocdata.forEach(element => {
          this.pocData = this.allUserFeedback.filter(item => item.EventID === element.EventID);
        });

        this.pocData.forEach(element => {
          let respdata = new ListOfInfo();

          respdata.id = element.EmployeeID;
          respdata.name = element.EmployeeName;
          respdata.eventName = element.EventName;
          respdata.rating = element.Rating;
          respdata.location = element.Location;
          respdata.project = element.Project;

          this.data.push(respdata);
        });

        this.feedbackChartImplementation();
        this.data.sort((a, b) => (a.id > b.id) ? -1 : 1);
        this.isSuccess = true;
        this.isLoad = false;
      }
      this.pagination(this.data);
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }

  getAllFeedback() {
    this.resetValues();
    if (this.userInfo.Role !== '') {
      this._OutreachService.getFeedbackDetails().subscribe((response: Feedback[]) => {
        if (response) {
          this.allUserFeedback = response;
          if (this.userInfo.Role === 'POC') {
            this.getPOCDetails();
          }
          else {
            this.allUserFeedback.forEach(element => {
              let respdata = new ListOfInfo();

              respdata.id = element.EmployeeID;
              respdata.name = (element.EmployeeName === null || element.EmployeeName === '') ? 'Sundar' : element.EmployeeName;
              respdata.eventName = element.EventName;
              respdata.rating = element.Rating; noUndefined
              respdata.location = element.Location;
              respdata.project = element.Project;

              this.data.push(respdata);
            });
            this.feedbackChartImplementation();
            this.data.sort((a, b) => (a.id > b.id) ? -1 : 1);
            this.isSuccess = true;
            this.isLoad = false;
          }
        }
        this.pagination(this.data);
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
        });
    }
  }

  getParticipated() {
    this.resetValues();
    if (this.userInfo) {
      this._OutreachService.getParticipatedUser().subscribe((response: UniqueItems[]) => {
        if (response) {
          if (this.userInfo.Role === 'POC') {
            this.pocData.forEach(element => {
              this.filteredUsers = response.filter(item => item.EventID === element.EventID);
            });
          }
          else {
            this.filteredUsers = response;
          }

          this.filteredUsers.forEach(element => {
            this.allUserFeedback.forEach(val => {
              if (!element.FeedbackStatus) {
                element.FeedbackStatus = ((val.EmployeeID === Number(element.EmployeeID)) && (val.EventID === element.EventID)) ? true : false;
              }
            });

            let respdata = new RefinerData();
            respdata.id = element.EmployeeID.toString();
            respdata.name = element.EmployeeName;
            respdata.eventName = element.EventName;
            respdata.beneficiary = element.BeneficiaryName;
            respdata.councilName = element.CouncilName;
            respdata.businessUnit = element.BusinessUnit;
            respdata.hours = element.VolunteerHours;
            respdata.feedbackStatus = (element.FeedbackStatus) ? 'Feedback Submitted' : 'Yet to submit';

            this.data1.push(respdata);
          });
          this.participatedChartImplementation();
          this.data1.sort((a, b) => (a.id > b.id) ? 1 : -1);
          this.isSuccess = true;
          this.isLoad = false;
        }
        this.pagination(this.data1);
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
        });
    }
  }

  getNotParticipated() {
    this.resetValues();
    if (this.userInfo) {
      this._OutreachService.getNotParticipatedUser().subscribe((response: UniqueItems[]) => {
        if (response) {
          if (this.userInfo.Role === 'POC') {
            this.pocData.forEach(element => {
              this.filteredUsers = response.filter(item => item.EventID === element.EventID);
            });
          }
          else {
            this.filteredUsers = response;
          }

          this.filteredUsers.forEach(element => {
            this.allUserFeedback.forEach(val => {
              element.FeedbackStatus = (val.EmployeeID === Number(element.EmployeeID)) ? true : false;
            });

            let respdata = new RefinerData();
            respdata.id = element.EmployeeID.toString();
            respdata.eventName = element.EventName;
            respdata.eventDate = element.EventDate;
            respdata.beneficiary = element.BeneficiaryName;
            respdata.baselocation = element.BaseLocation;
            respdata.feedbackStatus = (element.FeedbackStatus) ? 'Feedback Submitted' : 'Yet to submit';

            this.data1.push(respdata);
          });
          this.data1.sort((a, b) => (a.id > b.id) ? -1 : 1);
          this.isSuccess = true;
          this.isLoad = false;
        }
        this.pagination(this.data1);
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
        });
    }
  }

  getUnregistered() {
    this.resetValues();
    if (this.userInfo) {
      this._OutreachService.getUnRegisteredUser().subscribe((response: UniqueItems[]) => {
        if (response) {
          if (this.userInfo.Role === 'POC') {
            this.pocData.forEach(element => {
              this.filteredUsers = response.filter(item => item.EventID === element.EventID);
            });
          }
          else {
            this.filteredUsers = response;
          }

          this.filteredUsers.forEach(element => {
            this.allUserFeedback.forEach(val => {
              element.FeedbackStatus = (val.EmployeeID === Number(element.EmployeeID)) ? true : false;
            });

            let respdata = new RefinerData();
            respdata.id = element.EmployeeID.toString();
            respdata.eventName = element.EventName;
            respdata.eventDate = element.EventDate;
            respdata.beneficiary = element.BeneficiaryName;
            respdata.baselocation = element.BaseLocation;
            respdata.feedbackStatus = (element.FeedbackStatus) ? 'Feedback Submitted' : 'Yet to submit';

            this.data1.push(respdata);
          });
          this.data1.sort((a, b) => (a.id > b.id) ? -1 : 1);
          this.isSuccess = true;
          this.isLoad = false;
        }
        this.pagination(this.data1);
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
        });
    }
  }

  feedbackChartImplementation() {
    /* Doughnut Chart Value Implementation */
    this.dcLabels = ['Very Good', 'Good', 'Neutral', 'Not Bad', 'Bad'];

    this.ratings = this.data.filter(item => item.rating !== null && item.rating > 0).map(val => val.rating);
    this.ratings = groupBy(this.ratings, function (item) {
      return item;
    });
    this.ratings.sort((one, two) => (one > two ? -1 : 1));

    for (let i = 0; i < this.ratings.length; i++) {
      this.dcData.push(this.ratings[i].length);
    }

    /* BarChart Value Implementation */

    //this.bcLabels = ['Chennai', 'Pune', 'Coimbatore', 'Singapore', 'United Kingdom'];
    this.bcLabel1 = "Location";
    this.bcLabel2 = "Volunteer Hours";

    this.location = this.data.filter(item => item.location !== '').map(val => val.location);
    this.location = groupBy(this.location, function (item) {
      return item;
    });

    for (let i = 0; i < this.location.length; i++) {
      let label = this.location[i][0];
      this.bcLabels.push(label);
      this.bcData.push(this.location[i].length);
    }

    for (let i = 0; i < this.bcLabels.length; i++) {
      this.locationRatings.push(this.data.filter(item => item.location === this.bcLabels[i]).map(val => val.rating));
    }

    for (let i = 0; i < this.locationRatings.length; i++) {
      let count = 0;
      for (let j = 0; j < this.locationRatings[i].length; j++) {
        count += this.locationRatings[i][j];
      }
      this.bcData1.push(count);
    }
  }

  participatedChartImplementation() {
    /* Pie Chart Value Implementation */
    this.businessUnit = this.data1.filter(item => item.businessUnit !== '').map(val => val.businessUnit);
    this.filteredBU = groupBy(this.businessUnit, function (item) {
      return item;
    });
    this.filteredBU.sort((one, two) => (one.length > two.length ? -1 : 1));

    let topFiveBU = this.filteredBU.slice(0, 5);

    for (let i = 0; i < topFiveBU.length; i++) {
      let val = topFiveBU[i][0];
      this.dcLabels.push(val);
      this.dcData.push(topFiveBU[i].length);
    }

    /* Bar Chart Value Implementation */
    this.bcLabel1 = "Council";
    this.bcLabel2 = "Hours";

    this.locations = this.data1.filter(item => item.councilName !== '').map(val => val.councilName);
    this.locations = groupBy(this.locations, function (item) {
      return item;
    });

    for (let i = 0; i < this.locations.length; i++) {
      let val = this.locations[i][0];
      this.bcLabels.push(val);
      this.bcData.push(this.locations[i].length);
    }

    /* Lives Impacted  */
    for (let i = 0; i < this.bcLabels.length; i++) {
      this.totalHours.push(this.data1.filter(item => item.councilName === this.bcLabels[i]).map(val => val.hours));
    }

    for (let i = 0; i < this.totalHours.length; i++) {
      let count = 0;
      for (let j = 0; j < this.totalHours[i].length; j++) {
        count += this.totalHours[i][j];
      }
      this.bcData1.push(count);
    }
  }

  pagination(value: any) {
    var pageRecords = value.slice(0, 10);
    this.dataSource = new MatTableDataSource(pageRecords);
    this.gridData = value;
  }

  resetValues() {
    this.message = '';
    this.isLoad = true;
    this.isSuccess = false;
    this.data = [];
    this.data1 = [];
    this.dcLabels = [];
    this.bcLabels = [];
    this.dcData = [];
    this.dcData = [];
    this.bcData1 = [];
  }

  changeState(event: MatSelectionListChange) {
    this.gridData = [];
    this.dataSource = new MatTableDataSource([]);

    this.isType = event.option.value;
    this.typeOfUsers.forEach(item => {
      item.selected = (item.name === this.isType) ? true : false;
    });

    if (this.isType === 'Participated') {
      this.getParticipated();
    }
    else if (this.isType === 'Not Participated') {
      this.getNotParticipated();
    }
    else if (this.isType === 'Unregistered') {
      this.getUnregistered();
    } else {
      this.getAllFeedback();
    }
  }

  nextPage(event: PageEvent) {
    console.log(event.pageSize);
    this.pageEvent = event;

    var start = event.pageIndex * event.pageSize;
    var end = start + event.pageSize;

    var pageRecords = this.gridData.slice(start, end);
    this.dataSource = new MatTableDataSource(pageRecords);


  }

  sortedData = [];

  sortData(event: Sort, type: string) {
    if (!event.active || event.direction === '') {
      this.sortedData = this.gridData;
      return;
    }

    this.sortedData = this.gridData.sort((a, b) => {
      const isAsc = event.direction === 'asc';

      if (type === 'Participated') {
        switch (event.active) {
          case 'id': return compare(a.id, b.id, isAsc);
          case 'name': return compare(a.name, b.name, isAsc);
          case 'eventName': return compare(a.eventName, b.eventName, isAsc);
          case 'beneficiary': return compare(a.beneficiary, b.beneficiary, isAsc);
          case 'councilName': return compare(a.councilName, b.councilName, isAsc);
          case 'businessUnit': return compare(a.businessUnit, b.businessUnit, isAsc);
          case 'feedbackStatus': return compare(a.feedbackStatus, b.feedbackStatus, isAsc);
          default: return 0;
        }
      }
      if (type === 'Not Participated' || type === 'Unregistered') {
        switch (event.active) {
          case 'id': return compare(a.id, b.id, isAsc);
          case 'eventName': return compare(a.eventName, b.eventName, isAsc);
          case 'eventDate': return compare(a.eventDate, b.eventDate, isAsc);
          case 'beneficiary': return compare(a.beneficiary, b.beneficiary, isAsc);
          case 'baselocation': return compare(a.baselocation, b.baselocation, isAsc);
          case 'feedbackStatus': return compare(a.feedbackStatus, b.feedbackStatus, isAsc);
          default: return 0;
        }
      }
      else {
        switch (event.active) {
          case 'id': return compare(a.id, b.id, isAsc);
          case 'name': return compare(a.name, b.name, isAsc);
          case 'eventName': return compare(a.eventName, b.eventName, isAsc);
          case 'rating': return compare(a.rating, b.rating, isAsc);
          case 'location': return compare(a.location, b.location, isAsc);
          case 'project': return compare(a.project, b.project, isAsc);
          default: return 0;
        }
      }
    });

    if (this.pageEvent) {
      this.nextPage(this.pageEvent);
    }
    else {
      this.pageEvent = new PageEvent();
      this.pageEvent.pageIndex = 0;
      this.pageEvent.pageSize = 10;

      this.nextPage(this.pageEvent);

    }
  }

  setRole(role: string) {
    this.message = '';
    this.errorMessage = '';
    this.isSuccess = false;
    this.isError = false;
    if ((this.empId !== undefined && this.empId !== '') && role !== '') {
      let userRole = new Role();
      userRole.Id = this.empId;
      userRole.Role = role;
      this._AdminService.postUserRole(userRole).subscribe((response: Role) => {
        if (response === null) {
          this.empId = "";
          this.isSuccess = true;
          this.message = 'The User Role has been assigned successfully!';
          console.log(this.isSuccess);
        }
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
          this.errorMessage = "oops! Could you please try again after some time!"
        });

    } else {
      this.isError = true;
      this.errorMessage = "Ahh! You missed something.";
    }
  }

  rest(value: string) {
    this.message = (value === undefined || value === '') ? '' : this.message;
    this.errorMessage = (value === undefined || value === '') ? '' : this.errorMessage;
  }

  openDialog(): void {
    let modalData = new DialogData();
    modalData.name = this.userInfo.Role;
    modalData.message = "Please note that, import document should be only in the below format!"

    const dialogRef = this._dialog.open(ModalComponent, {
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.postExcelReport(result);
    });
  }

  postExcelReport(file: File) {
    let fileName = file.name;
    this._OutreachService.postExcel(file).subscribe((response: any) => {
      if (response === null) {
        switch (file.name !== undefined && file.name !== '') {
          case file.name === 'OutReach Event Information.xlsx':
            this.getParticipated();
            break;
          //case file.name === 'Outreach Events Summary.xlsx': 
          case file.name === 'Volunteer_Enrollment Details_Not_Attend.xlsx':
            this.getNotParticipated();
            break;
          case file.name === 'Volunteer_Enrollment Details_Unregistered.xlsx':
            this.getUnregistered();
            break;
        }
      }
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }

  getExcelReport() {
    let type: string;
    /* set the get type to fetch appropriate report */
    if (this.isType === 'Participated') {
      type = 'ParticipatedDetails';
    }
    else if (this.isType === 'Not Participated') {
      type = 'NotAttendedVolunteers';
    }
    else if (this.isType === 'Unregistered') {
      type = 'UnRegisteredVolunteers';
    } else {
      type = 'FeedbackDetails';
    }

    let host = this._OutreachService.api + '/api/dashboard/ExportToExcel?name=' + type;
    let element = document.createElement('a');
    element.href = host;
    element.click();
  }


  updateItems(isSelected: boolean, item: RefinerData) {
    this.filteredUsers.forEach(element => {
      element.FeedbackStatus = (element.EmployeeID.toString() === item.id) ? !isSelected : element.FeedbackStatus;
    });
  }

  sendEmail(data: any[]) {
    this.mailList = [];
    this.filteredUsers.forEach(element => {
      let respdata = new SendMailData();

      if (!element.FeedbackStatus) {
        respdata.EventID = element.EventID;
        respdata.EmployeeID = element.EmployeeID;
        respdata.EventName = element.EventName;
        respdata.MailType = '';
        respdata.EventDate = element.EventDate;

        this.mailList.push(respdata);
      }
    });
    this.message = 'Cool! The email has sent to associates successfully!';
    this._AdminService.postEmail(this.mailList).subscribe((response: any) => {
      if (response === null) {
        console.log(this.isSuccess);
      }
    },
      (error: HttpErrorResponse) => {
        this.isError = true;
      });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function groupBy(array, f) {
  var groups = {};
  array.forEach(function (o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  })
}


