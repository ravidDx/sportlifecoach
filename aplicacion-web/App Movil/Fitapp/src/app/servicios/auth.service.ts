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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform, public router: Router,
    private gplus: GooglePlus) {
  }

  logout() {
    this.AFauth.auth.signOut();
    console.log('Usuario mail ' + this.AFauth.auth.signOut());
    this.router.navigate(['/login']);
  }

  loginFire(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        // console.log('estas logeado');
        // console.log(user);
        resolve(user);
      }).catch(err =>
        // console.log('error : ' + err)
        rejected(err));
    });
  }

  loginwithFacebook() {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        console.log('dentro del if');
        // const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        // firebase.auth().signInWithCredential(facebookCredential);
        firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken))
          .then(suc => {
            this.router.navigate(['/tabs/home']);
            alert('ya ingreso');
          }).catch(ns => {
            alert('correo o contraseña incorrectos');
            alert(ns);
          });
      });
    } else {
      console.log('dentro del else');
      this.AFauth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          this.router.navigate(['/tabs/home']);
        }).catch(ns => {
          alert('correo o contraseña incorrectos');
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
            this.router.navigate(['/tabs/home']);
            alert('ya ingreso');
          }).catch(ns => {
            alert('Usuario o contraseña incorrectos');
          });
      });
    } else {
      // this.webGoogleLogin();
      console.log('dentro del else');
      this.AFauth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          console.log(res);
          this.router.navigate(['/tabs/home']);
        }).catch(ns => {
          alert('correo o contraseña incorrectos');
          console.log(ns);
        });
    }
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
}

