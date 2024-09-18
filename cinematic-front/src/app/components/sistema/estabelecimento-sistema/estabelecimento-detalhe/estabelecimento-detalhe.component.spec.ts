import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoDetalheComponent } from './estabelecimento-detalhe.component';

describe('EstabelecimentoDetalheComponent', () => {
  let component: EstabelecimentoDetalheComponent;
  let fixture: ComponentFixture<EstabelecimentoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstabelecimentoDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstabelecimentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
