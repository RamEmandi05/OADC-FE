import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationModelComponent } from './organization-model.component';

describe('OrganizationModelComponent', () => {
  let component: OrganizationModelComponent;
  let fixture: ComponentFixture<OrganizationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
