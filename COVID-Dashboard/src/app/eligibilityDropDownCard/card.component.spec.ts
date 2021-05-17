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
