import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../share/user.class';
// import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: User;
  nombre: string;
  apellido: string;
  // PARA ACCEDER A LA STORAGE DE FIREBASE
  // let storageRef = firebase.storage().ref();
  // let imageRef = storageRef.child('image').child('imageName');

  constructor(private AFauth: AngularFireAuth,
    private DBFire: AngularFireDatabase) { }

  // METODO GENERICO DE REGISTRO EN REALTIME DATABASE FIREBASE PARA REDES SOCIALES
  generic_register(usuario: any, user: User) {
    // verificar si existe o no el usuario en la bdd (si devuelve datos existe si devuelve null no existe)
    /*if (usuario.user.displayName) {
      const name = usuario.user.displayName.split(' ');
      this.nombre = name[0];
      this.apellido = name[1];
    } else {
      this.nombre = '';
      this.apellido = '';
    }*/
    // ingresar en la base de datos realtime con el mismo id del login
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
    }).then(c => { alert('creado' + JSON.stringify(c)); }).catch(e => { alert('no creado' + JSON.stringify(e)); });
  }

  // AL REALIZAR EL REGISTRO EN AUTENTICACION TAMBIEN LO HACE EN LA BASE REALTIME;
  realtime(user: any, us: User) {
    // ingresar en la base de datos realtime con el mismo id del login
    this.DBFire.object('usuarios/' + user.user.uid).set(us = {
      nombre: us.nombre,
      apellido: us.apellido,
      genero: us.genero,
      foto: 'assets/video/barras.png',
      altura: us.altura,
      peso: us.peso,
      date: us.date,
      objetivo: us.objetivo,
      rol: 'no afiliado',
      email: us.email
    }).then(c => { console.log('creado', c); }).catch(e => { console.log('no creado', e); });
  }

  // REGISTRO DE USUARIOS POR MEDIO DE CORREO Y CONTRASEÑA Y TAMBIEN LO CREA EN BD REALTIME AL MISMO TIEMPO
  async registrar(user: any) {
    try {
      return this.AFauth.auth.createUserWithEmailAndPassword(user.email, user.matching_passwords.password).
      then(auth => { // lo crea en database authentication
        this.realtime(auth, user); // lo crea en database realtime firebase
      }).then(succ => {
        console.log('se guardó serv realtime', succ);
      }).catch(err => {
        console.log('no se guardó serv realtime', err);
      });
    } catch (error) {
      console.log('no se conectó con firebase', error);
    }
  }

  // MODIFICAR PERFIL DE USUARIO EN LA BASE DE DATOS REALTIME DE FIREBASE
  updateUser(user: User) {
    this.AFauth.authState.subscribe(auth => {
      this.DBFire.object('usuarios/' + auth.uid).update(user)
        .then(
          s => { console.log('s', s); }) // Se actualizo
        .catch(
          e => { console.log('e', e); }); // hubo error en la actualización
    });
  }

}

