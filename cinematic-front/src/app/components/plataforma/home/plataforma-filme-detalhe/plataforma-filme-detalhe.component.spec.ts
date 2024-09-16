import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlataformaFilmeDetalheComponent } from './plataforma-filme-detalhe.component';

describe('PlataformaFilmeDetalheComponent', () => {
  let component: PlataformaFilmeDetalheComponent;
  let fixture: ComponentFixture<PlataformaFilmeDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlataformaFilmeDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlataformaFilmeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
