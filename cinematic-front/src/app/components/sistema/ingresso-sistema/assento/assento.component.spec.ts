import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssentoComponent } from './assento.component';

describe('AssentoComponent', () => {
  let component: AssentoComponent;
  let fixture: ComponentFixture<AssentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
