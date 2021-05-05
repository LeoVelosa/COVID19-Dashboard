import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinetypedataComponent } from './vaccinetypedata.component';

describe('VaccinetypedataComponent', () => {
  let component: VaccinetypedataComponent;
  let fixture: ComponentFixture<VaccinetypedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinetypedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinetypedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
