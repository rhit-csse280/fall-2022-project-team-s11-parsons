import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninCredentialPageComponent } from './signin-credential-page.component';

describe('SigninCredentialPageComponent', () => {
  let component: SigninCredentialPageComponent;
  let fixture: ComponentFixture<SigninCredentialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninCredentialPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninCredentialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
