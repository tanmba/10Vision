import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GabiToulouseComponent } from './gabi-toulouse.component';

describe('GabiToulouseComponent', () => {
  let component: GabiToulouseComponent;
  let fixture: ComponentFixture<GabiToulouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GabiToulouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabiToulouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
