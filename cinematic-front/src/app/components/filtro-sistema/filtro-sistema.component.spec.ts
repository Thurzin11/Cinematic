import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroSistemaComponent } from './filtro-sistema.component';

describe('FiltroSistemaComponent', () => {
  let component: FiltroSistemaComponent;
  let fixture: ComponentFixture<FiltroSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroSistemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
