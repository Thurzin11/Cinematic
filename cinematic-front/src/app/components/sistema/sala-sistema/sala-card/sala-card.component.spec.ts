import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaCardComponent } from './sala-card.component';

describe('SalaCardComponent', () => {
  let component: SalaCardComponent;
  let fixture: ComponentFixture<SalaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
