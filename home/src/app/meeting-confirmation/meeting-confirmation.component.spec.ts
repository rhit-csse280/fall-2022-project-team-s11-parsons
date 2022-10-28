import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingConfirmationComponent } from './meeting-confirmation.component';

describe('MeetingConfirmationComponent', () => {
  let component: MeetingConfirmationComponent;
  let fixture: ComponentFixture<MeetingConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
