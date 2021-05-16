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
