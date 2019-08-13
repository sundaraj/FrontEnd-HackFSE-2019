export class DialogData {
    name: string;
    message: string;
    note: string;
}

export class Feedback {
    EmployeeID: number;
    EmployeeName: string;
    EventID: string;
    EventName: string;
    EventDate: string;
    ActualDate: string;
    Rating: number;
    Comments: string;
    Location: string;
    Project: string;
    FeedbackOptions: any[];
    SelectedFeedbackOption: string;
    FeedbackQuestions: any[];
    FeedbackAnswers: any[];
    Story: string;
    IsFeedbackCollected: boolean;
    EnrollmentType: string;
}

export class POCInfo {
    EventID: string;
    POCID: string;
    POCName: string;
}

export class Authentication {
    UserName: number;
    Password: string;
}

export class Role extends Authentication {
    Id: string;
    LoginResult: string;
    Role: string;
}

export class ListOfInfo {
    id: number;
    name: string;
    eventName: string;
    rating: number;
    location: string;
    project: string;
}

export class RefinerData {
    id: string;
    name: string;
    eventName: string;
    eventDate: string;
    beneficiary: string;
    councilName: string;
    businessUnit: string;
    baselocation: string;
    feedbackStatus: string;
    hours: number;
}

export class UniqueItems extends Feedback {
    BeneficiaryName: string;
    CouncilName: string;
    BusinessUnit: string;
    BaseLocation: string;
    EventDate: string;
    VolunteerHours: number;
    FeedbackStatus: boolean;
}

export class SendMailData {
    EventID: string;
    EmployeeID: number;
    EventName: string;
    MailType: string;
    EventDate: string;
}




