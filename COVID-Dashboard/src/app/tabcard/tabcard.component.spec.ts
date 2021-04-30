import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcardComponent } from './tabcard.component';

describe('TabcardComponent', () => {
  let component: TabcardComponent;
  let fixture: ComponentFixture<TabcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
