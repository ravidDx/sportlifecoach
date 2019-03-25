import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDeportistaComponent } from './perfil-deportista.component';

describe('PerfilDeportistaComponent', () => {
  let component: PerfilDeportistaComponent;
  let fixture: ComponentFixture<PerfilDeportistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDeportistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
