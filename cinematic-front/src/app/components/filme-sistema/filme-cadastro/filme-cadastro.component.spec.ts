import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeCadastroComponent } from './filme-cadastro.component';

describe('FilmeCadastroComponent', () => {
  let component: FilmeCadastroComponent;
  let fixture: ComponentFixture<FilmeCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmeCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
