import { Component, OnInit } from '@angular/core';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {

  // grupos de formularios
  imc_form: FormGroup;
  peso_form: FormGroup;
  caldi_form: FormGroup;
  calquem_form: FormGroup;
  // para menu de calculadora
  v1 = true;
  v2 = false;
  v3 = false;
  v4 = false;
  // para visualizar resultados
  gimch = false;
  gimcm = false;
  gpi = false;
  caldi = false;
  calquem = false;
  // recibe valores del form
  weigth: number;
  heigth: number;
  age: number;
  gender: string;
  active: number;
  imc: number;
  p_ideal: number;
  calorias: number;
  time: number;
  quemadas: number;
  met: number;
  // mensajes de error para validad formularios
  validation_messages = {
    'age': [
      { type: 'required', message: 'Edad es requerida' }
    ],
    'time': [
      { type: 'required', message: 'Fecha es requerida' }
    ],
    'weigth': [
      { type: 'required', message: 'Peso es requerido' },
      { type: 'pattern', message: 'Peso de contener dos o tres cifras' }
    ],
    'heigth': [
      { type: 'required', message: 'Altura es requerido' },
      { type: 'pattern', message: 'Altura puede contener dos o tres cifras' }
    ],
  };
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.imc_form = this.create_imc_form();
    this.peso_form = this.create_peso_form();
    this.caldi_form = this.create_caldi_form();
    this.calquem_form = this.create_calquem_form();
  }

  calcularIMC() {
    this.weigth = this.imc_form.value.weigth;
    this.heigth = this.imc_form.value.heigth;
    this.gender = this.imc_form.value.gender;
    this.imc = (this.weigth / Math.pow((this.heigth / 100), 2));
    console.log(this.gender);
    if (this.gender === 'hombre') {
      this.gimch = true;
      this.gimcm = false;
    } else if (this.gender === 'mujer') {
      this.gimcm = true;
      this.gimch = false;
    }
    console.log(this.gimch);
    console.log(this.gimcm);
  }

  pesoIdeal() {
    console.log('peso');
    console.log(this.peso_form.value);
    this.gender = this.peso_form.value.gender;
    this.heigth = this.peso_form.value.heigth;
    if (this.gender === 'hombre') {
      this.p_ideal = (this.heigth - 100) * 0.90;
      console.log('hombre', this.p_ideal);
    } else if (this.gender === 'mujer') {
      this.p_ideal = (this.heigth - 100) * 0.85;
      console.log('mujer', this.p_ideal);
    }

  }

  caloriasD() {
    // Hombres: TMB = 66 + (13,7 x peso en kg) + (5 x altura en cm) - (6,75 x edad en años)
    // Mujeres: TMB = 655 + (9,6 x peso en kg) + (1.8 x altura en cm) - (4,7 x edad en años)
    this.gender = this.caldi_form.value.gender;
    this.weigth = this.caldi_form.value.weigth;
    this.heigth = this.caldi_form.value.heigth;
    this.active = this.caldi_form.value.active;
    this.age = this.caldi_form.value.age;
    if (this.gender === 'hombre') {
      this.calorias = (66 + (13.7 * this.weigth) + (5 * this.heigth) - (6.75 * this.age)) * this.active;
      console.log('hombre', this.calorias);
    } else if (this.gender === 'mujer') {
      this.calorias = (655 + (9.6 * this.weigth) + (1.8 * this.heigth) - (4.7 * this.age)) * this.active;
      console.log('mujer', this.calorias);
    }
  }

  calQuemadas() {
    console.log(this.calquem_form.value);
    this.met = this.calquem_form.value.met;
    this.weigth = this.calquem_form.value.weigth;
    this.quemadas = this.met * 0.0175 * this.weigth;
    console.log(this.quemadas);
  }

  // CONSTRUCCION DE FORMULARIO Y VALIDACIONES RESPECTIVAS
  create_imc_form() {
    return this.formBuilder.group({
      gender: new FormControl('mujer', Validators.required),
      weigth: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2,3}') // *[0-9]{2,3}[.][0-9]
      ])),
      heigth: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{3}')
      ])),
    });
  }

  create_peso_form() {
    return this.formBuilder.group({
      gender: new FormControl('mujer', Validators.required),
      heigth: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{3}')
      ])),
    });
  }

  create_caldi_form() {
    return this.formBuilder.group({
      gender: new FormControl('mujer', Validators.required),
      age: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2}') // *[0-9]{2,3}[.][0-9]
      ])),
      weigth: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2,3}') // *[0-9]{2,3}[.][0-9]
      ])),
      heigth: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{3}')
      ])),
      active: new FormControl('1.72', Validators.required),
    });
  }

  create_calquem_form() {
    return this.formBuilder.group({
      met: new FormControl('8', Validators.required),
      weigth: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2,3}') // *[0-9]{2,3}[.][0-9]
      ])),
      time: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2,3}') // *[0-9]{2,3}[.][0-9]
      ])),
    });
  }
}
