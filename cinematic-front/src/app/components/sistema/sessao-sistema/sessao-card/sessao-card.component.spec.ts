import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoCardComponent } from './sessao-card.component';

describe('SessaoCardComponent', () => {
  let component: SessaoCardComponent;
  let fixture: ComponentFixture<SessaoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
