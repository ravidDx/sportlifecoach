import { Component, OnInit } from '@angular/core';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { AuthService } from '../../../servicios/auth.service';
import { ValidacionesService } from '../../../servicios/validaciones.service';
import { Router } from '@angular/router';
// import {User} from '../../../share/user.class';
// mensaje visible al cargar la página al home
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
})
export class GenderPage implements OnInit {

  regForm: FormGroup;
  matching_passwords_group: FormGroup;
  user: any = {};
  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Nombre es requerido' }
    ],
    'apellido': [
      { type: 'required', message: 'Apellido es requerido' }
    ],
    'email': [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
    'password': [
      { type: 'required', message: 'Password es requerido' },
      { type: 'minlength', message: 'Password dede tener la menos 5 caracteres' },
      { type: 'pattern', message: 'Password debe contener una mayuscula, minuscula y un numero' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirmar contraseña es requerido' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Contraseñas no iguales' }
    ],
    'date': [
      { type: 'required', message: 'Fecha es requerida' }
    ],
    'peso': [
      { type: 'required', message: 'Peso es requerido' },
      { type: 'pattern', message: 'Peso solo contiene valores numericos' }
    ],
    'altura': [
      { type: 'required', message: 'Altura es requerido' },
      { type: 'pattern', message: 'Altura solo contiene valores numericos' }
    ],
  };
  constructor(private userService: UsuariosService, public router: Router, private formBuilder: FormBuilder,
    private valService: ValidacionesService, private authService: AuthService,
    public toastController: ToastController, public loadingController: LoadingController) {
  }

  ngOnInit() {
    this.matching_passwords_group = this.pass_validation();
    this.regForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      genero: new FormControl('mujer', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      objetivo: new FormControl('perder peso', Validators.required),
      date: new FormControl('2019-09-21', Validators.required),
      peso: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2,3}') // *[0-9]{2,3}[.][0-9]
      ])),
      altura: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{3}')
      ])),
    }, (formGroup: FormGroup) => {
      return this.valService.areEqual(formGroup);
    });
  }

  pass_validation() {
    return new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return this.valService.areEqual(formGroup);
    });
  }

  async registrar() {
    this.user = this.regForm.value;
    this.presentLoadingWithOptions();
    this.userService.registrar(this.user).then(
      suc => {
        this.presentToast();
        // this.presentLoadingWithOptions();
        this.authService.loginFire(this.user.email, this.user.matching_passwords.password).then(
          exi => {
            this.router.navigate(['/tabs/home']);
          });
      });
  }

  /* MENSAJES TOAST y LOADER*/
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El usuario se ha creado y logeado exitosamente',
      duration: 1500,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 1500,
      message: 'Please wait...',
      translucent: true,
      // cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  onResetForm() {
    this.regForm.reset();
  }


}
