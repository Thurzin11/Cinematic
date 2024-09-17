import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSistemaComponent } from './header-sistema.component';

describe('HeaderSistemaComponent', () => {
  let component: HeaderSistemaComponent;
  let fixture: ComponentFixture<HeaderSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
