import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInG3rdComponent } from './sign-in-g3rd.component';

describe('SignInG3rdComponent', () => {
  let component: SignInG3rdComponent;
  let fixture: ComponentFixture<SignInG3rdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInG3rdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInG3rdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
