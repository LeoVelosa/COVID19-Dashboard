import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmeddropdownComponent } from './pubmeddropdown.component';

describe('PubmeddropdownComponent', () => {
  let component: PubmeddropdownComponent;
  let fixture: ComponentFixture<PubmeddropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubmeddropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubmeddropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
