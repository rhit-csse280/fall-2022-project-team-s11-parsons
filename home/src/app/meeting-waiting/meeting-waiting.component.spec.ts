import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingWaitingComponent } from './meeting-waiting.component';

describe('MeetingWaitingComponent', () => {
  let component: MeetingWaitingComponent;
  let fixture: ComponentFixture<MeetingWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingWaitingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
