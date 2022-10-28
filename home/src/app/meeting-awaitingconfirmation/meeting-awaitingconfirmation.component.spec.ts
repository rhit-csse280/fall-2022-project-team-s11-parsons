import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAwaitingconfirmationComponent } from './meeting-awaitingconfirmation.component';

describe('MeetingAwaitingconfirmationComponent', () => {
  let component: MeetingAwaitingconfirmationComponent;
  let fixture: ComponentFixture<MeetingAwaitingconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingAwaitingconfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingAwaitingconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
