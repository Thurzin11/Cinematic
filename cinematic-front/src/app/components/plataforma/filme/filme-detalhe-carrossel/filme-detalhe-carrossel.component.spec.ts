import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDetalheCarrosselComponent } from './filme-detalhe-carrossel.component';

describe('FilmeDetalheCarrosselComponent', () => {
  let component: FilmeDetalheCarrosselComponent;
  let fixture: ComponentFixture<FilmeDetalheCarrosselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmeDetalheCarrosselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmeDetalheCarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
