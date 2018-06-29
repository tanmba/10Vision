import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GabiMontpelierComponent } from './gabi-montpelier.component';

describe('GabiMontpelierComponent', () => {
  let component: GabiMontpelierComponent;
  let fixture: ComponentFixture<GabiMontpelierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GabiMontpelierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabiMontpelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
