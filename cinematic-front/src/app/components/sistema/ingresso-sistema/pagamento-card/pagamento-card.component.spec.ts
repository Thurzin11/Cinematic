import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoCardComponent } from './pagamento-card.component';

describe('PagamentoCardComponent', () => {
  let component: PagamentoCardComponent;
  let fixture: ComponentFixture<PagamentoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagamentoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagamentoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
