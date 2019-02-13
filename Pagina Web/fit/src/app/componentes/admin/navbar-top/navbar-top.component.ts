import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  public isLogged:boolean = false;

  constructor(private _authService:AuthService, private _afsAuth:AngularFireAuth) { }

  ngOnInit() {
  	this.getCurrentUser();
  }

  getCurrentUser(){
  	this._authService.isAuth().subscribe(auth =>{
  		if(auth){
  			console.log("user logged");
  			this.isLogged = true;
  		}else{
  			console.log("NOT user logged");
  			this.isLogged = false;
  		}
  	})
  }

  onLogout(){
  	this._afsAuth.auth.signOut();
  	this.getCurrentUser();
  }

}
