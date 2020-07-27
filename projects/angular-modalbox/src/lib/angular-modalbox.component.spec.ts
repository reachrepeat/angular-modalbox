import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularModalboxComponent } from './angular-modalbox.component';

describe('AngularModalboxComponent', () => {
  let component: AngularModalboxComponent;
  let fixture: ComponentFixture<AngularModalboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularModalboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularModalboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
