import { Component, OnInit } from '@angular/core';
// importando el servicio para poder acceder a metodos
import { AuthService } from '../../servicios/auth.service';
// importando router para poder redirigir a otra page home
import { Router } from '@angular/router';
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
    private formBuilder: FormBuilder, public loadingController: LoadingController, public toastController: ToastController) { }

  ngOnInit() {
    // llamando al metodo que crea el formulario con sus validaciones
    this.login_form = this.createFormGroup();
  }

  loginFire() {
    this.email = this.login_form.value.email;
    this.password = this.login_form.value.password;
    this.cargando();
    this.authService.loginFire(this.email, this.password).then(res => {
      this.presentToast();
      this.router.navigate(['/tabs/home']);
    }).catch(err => {
      if (err.code === 'auth/wrong-password') {
        this.error1_Toast();
      } else  if (err.code === 'auth/user-not-found') {
        this.error2_Toast();
      } else {
        this.error3_Toast();
      }
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
  async cargando() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 2000,
      message: 'Espere por favor...',
      translucent: true,
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
  async error1_Toast() {
    const toast = await this.toastController.create({
      message: 'La contraseña ingresada es invalida',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
  async error2_Toast() {
    const toast = await this.toastController.create({
      message: 'No se ha encontrado ningun usuario con el correo ingresado',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }

  async error3_Toast() {
    const toast = await this.toastController.create({
      message: 'Verifique su conexión a internet',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
}
