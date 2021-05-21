import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDropDownComponent } from './chart-drop-down.component';

describe('ChartDropDownComponent', () => {
  let component: ChartDropDownComponent;
  let fixture: ComponentFixture<ChartDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
