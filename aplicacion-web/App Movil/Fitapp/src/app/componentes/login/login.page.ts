import { Component, OnInit } from '@angular/core';
// importando el servicio para poder acceder a metodos
import {AuthService} from '../../servicios/auth.service'; 
// importando router para poder redirigir a otra page home
import {Router} from '@angular/router';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// mensaje visible para cargar la página home
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // del formulario
  login_form: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
    'password': [
      { type: 'required', message: 'Password es requerido' },
      { type: 'minlength', message: 'Password dede tener la menos 5 caracteres' }
    ],
  };
  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router,
    private formBuilder: FormBuilder, public loadingController: LoadingController, public toastController: ToastController) {}

   ngOnInit() {
     // llamando al metodo que crea el formulario con sus validaciones
     this.login_form = this.createFormGroup();
  }

  loginFire() {
    this.email = this.login_form.value.email;
    this.password = this.login_form.value.password;
    this.authService.loginFire(this.email, this.password).then( res => {
      this.presentToast();
      this.router.navigate(['/tabs/home']);
    }).catch(err => {
      this.presentToast_error();
    });
  }

  loginFB() {
    this.authService.loginwithFacebook();
  }

  loginGP() {
    this.authService.loginGoogle();
  }

  // para crear y validar formulario
  createFormGroup() {
    return this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
        ])),
      });
    }

  // restablecer contraseña
  resetPass() {
    this.email = this.login_form.value.email;
    console.log(this.email);
    this.authService.reset_password(this.email);
  }

   /* MENSAJES TOAST PARA LOGEO*/
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      // spinner: null,
      duration: 1500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El usuario se ha logeado exitosamente',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }

  async presentToast_error() {
    const toast = await this.toastController.create({
      message: 'Datos Incorrectos o Usuario Inexistente',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
}
