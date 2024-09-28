import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIngressoComponent } from './card-ingresso.component';

describe('CardIngressoComponent', () => {
  let component: CardIngressoComponent;
  let fixture: ComponentFixture<CardIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardIngressoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
