import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxloaderComponent } from './ngxloader.component';

describe('NgxloaderComponent', () => {
  let component: NgxloaderComponent;
  let fixture: ComponentFixture<NgxloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
