import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GabisParisComponent } from './gabis-paris.component';

describe('GabisParisComponent', () => {
  let component: GabisParisComponent;
  let fixture: ComponentFixture<GabisParisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GabisParisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabisParisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
