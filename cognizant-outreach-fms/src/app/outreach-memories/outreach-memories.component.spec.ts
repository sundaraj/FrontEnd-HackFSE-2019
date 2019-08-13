import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutreachMemoriesComponent } from './outreach-memories.component';

describe('OutreachMemoriesComponent', () => {
  let component: OutreachMemoriesComponent;
  let fixture: ComponentFixture<OutreachMemoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutreachMemoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutreachMemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
