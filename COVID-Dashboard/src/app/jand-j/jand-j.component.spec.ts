import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JandJComponent } from './jand-j.component';

describe('JandJComponent', () => {
  let component: JandJComponent;
  let fixture: ComponentFixture<JandJComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JandJComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JandJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
