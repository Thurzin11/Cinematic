import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSistemaComponent } from './home-sistema.component';

describe('HomeSistemaComponent', () => {
  let component: HomeSistemaComponent;
  let fixture: ComponentFixture<HomeSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSistemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
