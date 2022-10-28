import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingconfirmationComponent } from './awaitingconfirmation.component';

describe('AwaitingconfirmationComponent', () => {
  let component: AwaitingconfirmationComponent;
  let fixture: ComponentFixture<AwaitingconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingconfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitingconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
