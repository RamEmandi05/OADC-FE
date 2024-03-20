import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrginizatiosnCreateModelComponent } from './orginizatiosn-create-model.component';

describe('OrginizatiosnCreateModelComponent', () => {
  let component: OrginizatiosnCreateModelComponent;
  let fixture: ComponentFixture<OrginizatiosnCreateModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrginizatiosnCreateModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrginizatiosnCreateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
