import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingInvitationreceivedComponent } from './meeting-invitationreceived.component';

describe('MeetingInvitationreceivedComponent', () => {
  let component: MeetingInvitationreceivedComponent;
  let fixture: ComponentFixture<MeetingInvitationreceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingInvitationreceivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingInvitationreceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
