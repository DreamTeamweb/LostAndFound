import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectPerduComponent } from './object-perdu.component';

describe('ObjectPerduComponent', () => {
  let component: ObjectPerduComponent;
  let fixture: ComponentFixture<ObjectPerduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectPerduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectPerduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
