import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeCarroselComponent } from './filme-carrosel.component';

describe('FilmeCarroselComponent', () => {
  let component: FilmeCarroselComponent;
  let fixture: ComponentFixture<FilmeCarroselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmeCarroselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmeCarroselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
