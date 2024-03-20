import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUploadsComponent } from './organization-uploads.component';

describe('OrganizationUploadsComponent', () => {
  let component: OrganizationUploadsComponent;
  let fixture: ComponentFixture<OrganizationUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationUploadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
