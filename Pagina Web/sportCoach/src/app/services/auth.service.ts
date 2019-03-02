import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public  afAuth:AngularFireAuth) { }

  registerUser(){}
  loginEmailUser(email:string, pass:string){
  	return new Promise((resolve, reject)=>{
  		this.afAuth.auth.signInWithEmailAndPassword(email,pass)
  		  .then(userData =>resolve(userData),
  		  err => reject(err))

  	});

  }
  loginFacebookUser(){}
  loginGoogleUser(){}
  logoutUser(){ 
  	return this.afAuth.auth.signOut();
  }

  isAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth)); 
  }
  
}
