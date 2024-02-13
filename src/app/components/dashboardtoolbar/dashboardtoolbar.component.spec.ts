import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardtoolbarComponent } from './dashboardtoolbar.component';

describe('DashboardtoolbarComponent', () => {
  let component: DashboardtoolbarComponent;
  let fixture: ComponentFixture<DashboardtoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardtoolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardtoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
