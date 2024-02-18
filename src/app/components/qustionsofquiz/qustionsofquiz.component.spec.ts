import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QustionsofquizComponent } from './qustionsofquiz.component';

describe('QustionsofquizComponent', () => {
  let component: QustionsofquizComponent;
  let fixture: ComponentFixture<QustionsofquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QustionsofquizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QustionsofquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
