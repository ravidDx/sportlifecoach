import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../share/user.class';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: User;
  nombre: string;
  apellido: string;

  constructor(private AFauth: AngularFireAuth, private router: Router, public toastController: ToastController,
    private DBFire: AngularFireDatabase) { }

  // METODO GENERICO DE REGISTRO EN REALTIME DATABASE FIREBASE PARA REDES SOCIALES
  generic_register(usuario: any, user: User) {
    // ingresar en la base de datos realtime con el mismo id del login
    return new Promise((resolve, rejected) => {
      this.DBFire.object('usuarios/' + usuario.uid).set(user = {
        nombre: user.nombre,
        apellido: user.apellido,
        genero: user.genero,
        foto: usuario.photoURL,
        altura: user.altura,
        peso: user.peso,
        date: user.date,
        objetivo: user.objetivo,
        rol: 'no afiliado',
        email: user.email
      }).then(c => { resolve(c); })
        .catch(e => { rejected(e); });
    });
  }

  // REGISTRO EN LA BASE REALTIME UTILIZADO POR EL METODO REGISTRAR PRIMERO POR CORREO Y CONTRASEÑA
  async realtime(user: any, us: User) {
    // ingresar en la base de datos realtime con el mismo id del login
    return this.DBFire.object('usuarios/' + user.user.uid).set(us = {
      nombre: us.nombre,
      apellido: us.apellido,
      genero: us.genero,
      foto: 'assets/video/user.jpg',
      altura: us.altura,
      peso: us.peso,
      date: us.date,
      objetivo: us.objetivo,
      rol: 'no afiliado',
      email: us.email
    }).then(c => { console.log('desde serv: usuario  creado en la bdd'); }) // lo creo correctamente
      .catch(e => { console.log('desde serv: usuario no creado en la bdd'); }); // error en la creacion
  }

  // PARA LOGEARSE EN LA APP MEDIANTE USUARIO Y CONTRASEÑA
  loginFire(email: any, password: any) {
    this.AFauth.auth.signInWithEmailAndPassword(email, password).then(() => {
      console.log('el usuario se ha creado exitosamente'); // ** este es un toast
      this.OKToast();
      this.router.navigate(['/tabs/home']);
    });
  }
  // REGISTRO Y LOGIN  DE USUARIOS POR MEDIO DE CORREO Y CONTRASEÑA Y TAMBIEN LO CREA EN BD REALTIME AL MISMO TIEMPO
  registrar(user: any) {
    this.AFauth.auth.createUserWithEmailAndPassword(user.email, user.matching_passwords.password).
      then(auth => { // lo crea en database authentication
        this.realtime(auth, user); // lo crea en database realtime firebase*/
        console.log('se guardó serv autenti', auth);
        this.loginFire(user.email, user.matching_passwords.password);
      }).catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          console.log('Usuario no creado : el email ingresado esta siendo usado por otra cuenta '); // **ese es un toast**
          this.Bad_Toast();
        } else {
          console.log('Usuario no creado : Verifique su conexion a internet '); // **ese es un toast**
          this.Bad1_Toast();
        }
      });
  }
  /*MENSAJES DEL REGISTRO DE NUEVA CUENTA  */
  async OKToast() {
    const toast = await this.toastController.create({
      message: 'El usuario se ha logeado con exitosamente',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
  async Bad_Toast() {
    const toast = await this.toastController.create({
      message: 'Usuario no creado : el email ingresado esta siendo usado por otra cuenta',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
  async Bad1_Toast() {
    const toast = await this.toastController.create({
      message: 'Usuario no creado : Verifique su conexion a internet',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }

  // MODIFICAR PERFIL DE USUARIO EN LA BASE DE DATOS REALTIME DE FIREBASE
  async updateUser(user: User) {
    this.AFauth.authState.subscribe(auth => {
      this.DBFire.object('usuarios/' + auth.uid).update(user).then(() => {
          this.upd_ok(); // Se actualizo
        }).catch(() => {
          this.upd_bad(); // hubo error en la actualización
        });
    });
  }

  // MENSAJES PARA EL UPDATE
  async upd_ok() {
    const toast = await this.toastController.create({
      message: 'El usuario se ha modificado exitosamente',
      duration: 2000,
      color: 'dark',
      position: 'bottom',
      animated: true
    });
    toast.present();
  }

  async upd_bad() {
    const toast = await this.toastController.create({
      message: 'El usuario no se ha modificado',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }



}
