import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchBarComponent } from './launch-bar.component';

describe('LaunchBarComponent', () => {
  let component: LaunchBarComponent;
  let fixture: ComponentFixture<LaunchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
