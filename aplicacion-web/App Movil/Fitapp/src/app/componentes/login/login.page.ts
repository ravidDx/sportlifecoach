import { Component, OnInit } from '@angular/core';
// importando el servicio para poder acceder a metodos
import {AuthService} from '../../servicios/auth.service';
// importando router para poder redirigir a otra page home
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  constructor(private authService: AuthService, public router: Router) {}

   ngOnInit() {
  }

  loginFire() {
    console.log('estas en la funcion');
    this.authService.loginFire(this.email, this.password).then( res => {
      console.log(res);
      this.router.navigate(['/tabs/home']);
    }).catch(err => alert ('los datos no son correctos o no existe el usuario'));
  }

  loginFB() {
    this.authService.loginwithFacebook();
  }

  loginGP() {
    this.authService.loginGoogle();
  }
}
