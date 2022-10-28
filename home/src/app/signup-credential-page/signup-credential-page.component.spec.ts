import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCredentialPageComponent } from './signup-credential-page.component';

describe('SignupCredentialPageComponent', () => {
  let component: SignupCredentialPageComponent;
  let fixture: ComponentFixture<SignupCredentialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupCredentialPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupCredentialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
