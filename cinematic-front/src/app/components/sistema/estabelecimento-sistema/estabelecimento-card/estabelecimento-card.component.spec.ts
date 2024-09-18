import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoCardComponent } from './estabelecimento-card.component';

describe('EstabelecimentoCardComponent', () => {
  let component: EstabelecimentoCardComponent;
  let fixture: ComponentFixture<EstabelecimentoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstabelecimentoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstabelecimentoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
