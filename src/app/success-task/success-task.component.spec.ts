import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTaskComponent } from './success-task.component';

describe('SuccessTaskComponent', () => {
  let component: SuccessTaskComponent;
  let fixture: ComponentFixture<SuccessTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
