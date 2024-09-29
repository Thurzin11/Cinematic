import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoIngressoComponent } from './caminho-ingresso.component';

describe('CaminhoIngressoComponent', () => {
  let component: CaminhoIngressoComponent;
  let fixture: ComponentFixture<CaminhoIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaminhoIngressoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaminhoIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
