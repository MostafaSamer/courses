import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuneComponent } from './mune.component';

describe('MuneComponent', () => {
  let component: MuneComponent;
  let fixture: ComponentFixture<MuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
