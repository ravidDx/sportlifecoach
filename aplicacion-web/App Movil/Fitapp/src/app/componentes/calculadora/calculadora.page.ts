import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {

  v1 = true;
  v2 = false;
  v3 = false;
  v4 = false;

  constructor() { }

  ngOnInit() {
  }


}
