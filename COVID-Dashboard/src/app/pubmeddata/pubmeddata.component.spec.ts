import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmeddataComponent } from './pubmeddata.component';

describe('PubmeddataComponent', () => {
  let component: PubmeddataComponent;
  let fixture: ComponentFixture<PubmeddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubmeddataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubmeddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
