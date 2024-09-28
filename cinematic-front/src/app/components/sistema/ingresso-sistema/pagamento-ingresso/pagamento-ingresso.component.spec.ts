import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoIngressoComponent } from './pagamento-ingresso.component';

describe('PagamentoIngressoComponent', () => {
  let component: PagamentoIngressoComponent;
  let fixture: ComponentFixture<PagamentoIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagamentoIngressoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagamentoIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
