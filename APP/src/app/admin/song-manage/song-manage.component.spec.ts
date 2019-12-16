import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongManageComponent } from './song-manage.component';

describe('SongManageComponent', () => {
  let component: SongManageComponent;
  let fixture: ComponentFixture<SongManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
