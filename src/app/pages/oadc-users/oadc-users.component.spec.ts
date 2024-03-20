import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OadcUsersComponent } from './oadc-users.component';

describe('OadcUsersComponent', () => {
  let component: OadcUsersComponent;
  let fixture: ComponentFixture<OadcUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OadcUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OadcUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
