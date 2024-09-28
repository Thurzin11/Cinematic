import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoIngressoComponent } from './sessao-ingresso.component';

describe('SessaoIngressoComponent', () => {
  let component: SessaoIngressoComponent;
  let fixture: ComponentFixture<SessaoIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoIngressoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
