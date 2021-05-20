/* @JM_OneLess And @LV_OneLess (I used his card file and reformatted it to make a specific card so I want to give him credit)  */
/* This file interacts with every other file in eligibilityDropDownCard. Aside from that, COVID-Dashboard/package.json  */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityDropDownCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: EligibilityDropDownCardComponent;
  let fixture: ComponentFixture<EligibilityDropDownCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligibilityDropDownCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityDropDownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
