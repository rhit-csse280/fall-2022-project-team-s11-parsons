import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSetupComponent } from './meeting-setup.component';

describe('MeetingSetupComponent', () => {
  let component: MeetingSetupComponent;
  let fixture: ComponentFixture<MeetingSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
