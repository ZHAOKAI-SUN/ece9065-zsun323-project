import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TOP10Component } from './top10.component';

describe('TOP10Component', () => {
  let component: TOP10Component;
  let fixture: ComponentFixture<TOP10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TOP10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TOP10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
