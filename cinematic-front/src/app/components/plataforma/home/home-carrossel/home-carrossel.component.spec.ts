import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarrosselComponent } from './home-carrossel.component';

describe('HomeCarrosselComponent', () => {
  let component: HomeCarrosselComponent;
  let fixture: ComponentFixture<HomeCarrosselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCarrosselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
