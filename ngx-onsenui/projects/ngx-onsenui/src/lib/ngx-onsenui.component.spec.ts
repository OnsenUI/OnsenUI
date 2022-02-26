import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOnsenuiComponent } from './ngx-onsenui.component';

describe('NgxOnsenuiComponent', () => {
  let component: NgxOnsenuiComponent;
  let fixture: ComponentFixture<NgxOnsenuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxOnsenuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxOnsenuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
