import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinedataComponent } from './vaccinedata.component';

describe('VaccinedataComponent', () => {
  let component: VaccinedataComponent;
  let fixture: ComponentFixture<VaccinedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
