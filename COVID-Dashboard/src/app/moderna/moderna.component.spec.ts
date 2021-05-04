import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernaComponent } from './moderna.component';

describe('ModernaComponent', () => {
  let component: ModernaComponent;
  let fixture: ComponentFixture<ModernaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
