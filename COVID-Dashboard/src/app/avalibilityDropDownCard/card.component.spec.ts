/**
 * @JM_OneLess This is modified code from Card (Leo made that).
 * I made Modifications as this card needed a drop down, and
 * long story short, for formatting, making a new card was the
 *  best way to go. This card is for Vaccine Avalibility Information
 *  in Florida.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalibilityDropDownCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: AvalibilityDropDownCardComponent;
  let fixture: ComponentFixture<AvalibilityDropDownCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvalibilityDropDownCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvalibilityDropDownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
