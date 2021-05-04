import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofComorbiditiesComponent } from './listof-comorbidities.component';

describe('ListofComorbiditiesComponent', () => {
  let component: ListofComorbiditiesComponent;
  let fixture: ComponentFixture<ListofComorbiditiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofComorbiditiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofComorbiditiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
