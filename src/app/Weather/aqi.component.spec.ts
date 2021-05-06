import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiComponent } from './aqi.component';

describe('AqiComponent', () => {
  let component: AqiComponent;
  let fixture: ComponentFixture<AqiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
