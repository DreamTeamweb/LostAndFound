import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectLostComponent } from './object-lost.component';

describe('ObjectLostComponent', () => {
  let component: ObjectLostComponent;
  let fixture: ComponentFixture<ObjectLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
