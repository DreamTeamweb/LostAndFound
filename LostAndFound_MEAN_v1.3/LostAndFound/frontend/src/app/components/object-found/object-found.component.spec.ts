import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectFoundComponent } from './object-found.component';

describe('ObjectFoundComponent', () => {
  let component: ObjectFoundComponent;
  let fixture: ComponentFixture<ObjectFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
