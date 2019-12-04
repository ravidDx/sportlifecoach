import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SlidePage } from './componentes/slide/slide.page';
import { LoginPage } from './componentes/login/login.page';
import { timer } from 'rxjs';

import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

// para traer usuario de la base realtime
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
})
export class AppComponent {

  rootPage: any = SlidePage;
  showSplash = true; // <-- show animation
  public usuario: any = {}; // para llenar el usuario en caso que si existir un usuario logeado
  public provFb: Boolean = false;
  public provGp: Boolean = false;
  public provFi: Boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    public router: Router, private AFauth: AngularFireAuth, private DBFire: AngularFireDatabase
  ) {
    
    this.initializeApp();
    // para saber si existe un usuario logeado
    this.AFauth.authState.subscribe(user => {
      console.log('Estado del usuario', user);
      // this.usuario.uid = user.uid;
      // console.log(this.usuario.uid + 'uid');
      // this.usuario.nombre = user.displayName;
      // console.log(this.usuario.nombre + 'uid');

      if (!user) {
        this.usuario.nombre = 'Nuevo Usuario';
        console.log(this.usuario.nombre);
        // this.router.navigate(['/login']);
      } else {
        // console.log('dentro else app');
        this.DBFire.object('usuarios/' + user.uid).valueChanges().subscribe( us => {
          this.usuario = us;
        });

        if (user.providerData[0].providerId === 'facebook.com') {
          console.log('facebook');
          this.provFb = true;
          this.provGp = false;
          this.provFi = false;
        } else if (user.providerData[0].providerId === 'google.com') {
          console.log('gmail');
          this.provGp = true;
          this.provFb = false;
          this.provFi = false;
        } else if (user.providerData[0].providerId === 'password') {
          console.log('firebase');
          this.provFi = true;
          this.provGp = false;
          this.provFb = false;
        }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
    });
  }

  logout() {
    this.authService.logout();
  }

  logoutFB() {
    this.authService.logOutOfFacebook();
  }

  logoutGP() {
    this.authService.logOutGooglePlus();
  }
}
