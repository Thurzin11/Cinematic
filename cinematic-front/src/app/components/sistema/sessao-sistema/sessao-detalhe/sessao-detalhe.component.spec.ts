import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoDetalheComponent } from './sessao-detalhe.component';

describe('SessaoDetalheComponent', () => {
  let component: SessaoDetalheComponent;
  let fixture: ComponentFixture<SessaoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
