import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
// para google
import {Observable} from 'rxjs';
import { GooglePlus} from '@ionic-native/google-plus/ngx';
// import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import {Platform} from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // google plus
  user: Observable<firebase.User>;

  constructor(private AFauth: AngularFireAuth,
              private fb: Facebook,
              private platform: Platform, public router: Router,
              private gplus: GooglePlus) {

                // google plus
                this.user = this.AFauth.authState;
              }

  loginFire(email: string, password: string) {

    return new Promise ((resolve, rejected) => {
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
        }).catch( ns => {
          alert('correo o contraseña incorrectos');
        });
      });
    } else {
      console.log('dentro del else');
      return this.AFauth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          this.router.navigate(['/tabs/home']);
        }).catch( ns => {
          alert('correo o contraseña incorrectos');
        });
    }
  }

  logOutOfFacebook() {
    this.AFauth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.fb.logout();
    }
  }

  loginGoogle() {
    if (this.platform.is('cordova')) {
      // this.nativeGoogleLogin();
      this.gplus.login({
        webClientId: '67946954997-jekd82u5gbsuqpaf595qnv6unqg2srn7.apps.googleusercontent.com',
        offline: true,
      }).then( res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
          alert('ya ingreso');
          this.router.navigate(['/tabs/home']);
        }).catch(ns => {
          alert ('Usuario o contraseña incorrectos');
        });
      });
    } else {
      // this.webGoogleLogin();
      console.log('dentro del else');
      return this.AFauth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          console.log(res);
          this.router.navigate(['/tabs/home']);
        }).catch( ns => {
          alert('correo o contraseña incorrectos');
        });
    }
  }

  /*async nativeGoogleLogin(): Promise<any> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: '67946954997-jekd82u5gbsuqpaf595qnv6unqg2srn7.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });
      return await  this.AFauth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );

    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider =  new firebase.auth.GoogleAuthProvider();
      const credential = await this.AFauth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }*/

  logOutGooglePlus() {
    this.AFauth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }
}

