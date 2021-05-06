import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmedDropDownCardComponent } from './pubmed-drop-down-card.component';

describe('PubmedDropDownCardComponent', () => {
  let component: PubmedDropDownCardComponent;
  let fixture: ComponentFixture<PubmedDropDownCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubmedDropDownCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubmedDropDownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
