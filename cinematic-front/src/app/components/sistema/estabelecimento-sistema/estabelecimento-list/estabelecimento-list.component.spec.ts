import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoListComponent } from './estabelecimento-list.component';

describe('EstabelecimentoListComponent', () => {
  let component: EstabelecimentoListComponent;
  let fixture: ComponentFixture<EstabelecimentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstabelecimentoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstabelecimentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
