import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioCadastroComponent } from './horario-cadastro.component';

describe('HorarioCadastroComponent', () => {
  let component: HorarioCadastroComponent;
  let fixture: ComponentFixture<HorarioCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorarioCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorarioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
