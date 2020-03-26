import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTrouveComponent } from './object-trouve.component';

describe('ObjectTrouveComponent', () => {
  let component: ObjectTrouveComponent;
  let fixture: ComponentFixture<ObjectTrouveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTrouveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTrouveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
