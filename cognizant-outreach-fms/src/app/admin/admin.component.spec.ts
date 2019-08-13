import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AdminComponent } from './admin.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent, 
        HeaderComponent,
        FooterComponent, 
      ],
      imports: [
        MatProgressSpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as type 'Feedback'`, async(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.isType).toEqual('Feedback');
  }));
});
