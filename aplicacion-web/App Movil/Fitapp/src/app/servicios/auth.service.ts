import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
// para google
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

// Para registro
import { User } from '../share/user.class'; // interface
import { AngularFireDatabase } from '@angular/fire/database';
import { UsuariosService } from './usuarios.service';

// mensaje visible para cargar la página home
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  nombre: string;
  apellido: string;
  usuario: User;
  constructor(private AFauth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform, public router: Router,
    private gplus: GooglePlus,
    private DBFire: AngularFireDatabase,
    private userService: UsuariosService,
    public loadingController: LoadingController,
    public toastController: ToastController) {
  }

  // INICIO  Y CIERRE DE SESION
  logout() {
    this.AFauth.auth.signOut();
    console.log('Usuario mail ' + this.AFauth.auth.signOut());
    this.router.navigate(['/login']);
  }

  loginFire(email: any, password: any) {

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err =>
        rejected(err));
    });
  }

  loginwithFacebook() {
    if (this.platform.is('cordova')) {
      alert('dentro del if');
      this.fb.login(['email']).then(res => {
        alert('estado' + res.status);
        firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken))
          .then(suc => {
            alert ('sfb :' + JSON.stringify(suc));
            // devuelve los datos de cierto usuario de acuerdo a su uid
            this.DBFire.object('usuarios/' + suc.user.uid).valueChanges().subscribe(
              s => {
                if (s !== null) { // si lo que devuelve es null entonces lo crea en la bd realtime de firebase y lo dirige al home
                  alert('existe');
                  this.router.navigate(['/tabs/home']);
                } else {
                  alert('no existe');
                  this.router.navigate(['/registro/personal']);
                  // this.userService.generic_register(suc);
                }
              });
              this.presentToast();
          }).catch(ns => {
            alert('correo o contraseña incorrectos');
            alert(ns);
          });
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });
    } else {
      console.log('dentro del else');
      this.AFauth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          // devuelve los datos de cierto usuario de acuerdo a su uid
          this.DBFire.object('usuarios/' + res.user.uid).valueChanges().subscribe(
            s => {
              if (s !== null) { // si lo que devuelve es null entonces lo crea en la bd realtime de firebase y lo dirige al home
                alert('existe');
                this.router.navigate(['/tabs/home']);
              } else {
                alert('no existe');
                this.router.navigate(['/registro/personal']);
                // this.userService.generic_register(res);
              }
            });
        }).then(succ => {
          // this.router.navigate(['/registro/datos']); // cuando si se conecta con firebase
        }).catch(ns => {
          alert('correo o contraseña incorrectos'); // cuando no se conecta con firebase - eror de firebase
          alert(ns);
        });
    }
  }

  loginGoogle() {
    if (this.platform.is('cordova')) {
      // this.nativeGoogleLogin();
      this.gplus.login({
        webClientId: '67946954997-jekd82u5gbsuqpaf595qnv6unqg2srn7.apps.googleusercontent.com',
        offline: true
      }).then(res => {
        alert('antes cred');
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(suc => {
            // devuelve los datos de cierto usuario de acuerdo a su uid
            this.DBFire.object('usuarios/' + suc.user.uid).valueChanges().subscribe(
              s => {
                if (s !== null) { // si lo que devuelve es null entonces lo crea en la bd realtime de firebase y lo dirige al home
                  alert('existe');
                } else {
                  alert('no existe');
                  // this.userService.generic_register(suc);
                }
              });
            this.router.navigate(['/tabs/home']);
            alert('ya ingreso');
          }).catch(ns => {
            alert('Usuario o contraseña incorrectos - erro de firebase');
          });
      });
    } /* else {
      // this.webGoogleLogin();
      console.log('dentro del else');
      this.AFauth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          console.log(res);
          // devuelve los datos de cierto usuario de acuerdo a su uid
          this.DBFire.object('usuarios/' + res.user.uid).valueChanges().subscribe(
            s => {
              if (s !== null) { // si lo que devuelve es null entonces lo crea en la bd realtime de firebase y lo dirige al home
                alert('existe');
              } else {
                alert('no existe');
                this.userService.generic_register(res);
              }
            });
          this.router.navigate(['/tabs/home']);
        }).catch(ns => {
          alert('correo o contraseña incorrectos -error de firebase');
          console.log(ns);
        });
    }*/
  }

  logOutOfFacebook() {
    this.AFauth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.fb.logout();
    }
    this.router.navigate(['/login']);
  }

  logOutGooglePlus() {
    this.AFauth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
    this.router.navigate(['/login']);
  }

  reset_password(email: string) {
    this.AFauth.auth.sendPasswordResetEmail(email)
      .then(res => {
        alert('te hemos enviado el link de reset password a tu correo');
      }).catch(err => {
        alert('el correo no existe en nuestra bdd, verifica el email ingresado');
      });
  }

  /* MENSAJES TOAST PARA LOGEO*/
  /*async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      // spinner: null,
      duration: 1500,
      message: 'Please wait...',
      translucent: true,
      // cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }*/
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

}

