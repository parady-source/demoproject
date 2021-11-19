import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltravioletComponent } from './ultraviolet.component';

describe('UltravioletComponent', () => {
  let component: UltravioletComponent;
  let fixture: ComponentFixture<UltravioletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltravioletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltravioletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
