import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosPage } from './ejercicios.page';

describe('EjerciciosPage', () => {
  let component: EjerciciosPage;
  let fixture: ComponentFixture<EjerciciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjerciciosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
