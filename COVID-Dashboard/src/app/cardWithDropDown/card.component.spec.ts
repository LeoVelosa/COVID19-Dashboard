import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithDropDownComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardWithDropDownComponent;
  let fixture: ComponentFixture<CardWithDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardWithDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWithDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
