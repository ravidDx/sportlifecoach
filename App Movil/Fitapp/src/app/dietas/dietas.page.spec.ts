import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietasPage } from './dietas.page';

describe('DietasPage', () => {
  let component: DietasPage;
  let fixture: ComponentFixture<DietasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
