import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OadcAppointmentsComponent } from './oadc-appointments.component';

describe('OadcAppointmentsComponent', () => {
  let component: OadcAppointmentsComponent;
  let fixture: ComponentFixture<OadcAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OadcAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OadcAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
