import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GabiNantesComponent } from './gabi-nantes.component';

describe('GabiNantesComponent', () => {
  let component: GabiNantesComponent;
  let fixture: ComponentFixture<GabiNantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GabiNantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabiNantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
