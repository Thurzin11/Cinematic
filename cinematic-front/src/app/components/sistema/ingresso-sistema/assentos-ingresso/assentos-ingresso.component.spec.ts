import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssentosIngressoComponent } from './assentos-ingresso.component';

describe('AssentosIngressoComponent', () => {
  let component: AssentosIngressoComponent;
  let fixture: ComponentFixture<AssentosIngressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssentosIngressoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssentosIngressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
