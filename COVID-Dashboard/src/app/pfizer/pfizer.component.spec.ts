import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfizerComponent } from './pfizer.component';

describe('PfizerComponent', () => {
  let component: PfizerComponent;
  let fixture: ComponentFixture<PfizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
