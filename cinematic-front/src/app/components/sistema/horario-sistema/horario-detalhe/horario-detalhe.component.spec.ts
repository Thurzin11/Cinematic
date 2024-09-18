import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioDetalheComponent } from './horario-detalhe.component';

describe('HorarioDetalheComponent', () => {
  let component: HorarioDetalheComponent;
  let fixture: ComponentFixture<HorarioDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorarioDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorarioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
