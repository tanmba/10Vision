import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGabisComponent } from './my-gabis.component';

describe('MyGabisComponent', () => {
  let component: MyGabisComponent;
  let fixture: ComponentFixture<MyGabisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGabisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGabisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
