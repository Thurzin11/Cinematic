import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeSistemaComponent } from './filme-sistema.component';

describe('FilmeSistemaComponent', () => {
  let component: FilmeSistemaComponent;
  let fixture: ComponentFixture<FilmeSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmeSistemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmeSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
