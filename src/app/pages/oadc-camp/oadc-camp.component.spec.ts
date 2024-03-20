import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OadcCampComponent } from './oadc-camp.component';

describe('OadcCampComponent', () => {
  let component: OadcCampComponent;
  let fixture: ComponentFixture<OadcCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OadcCampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OadcCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
