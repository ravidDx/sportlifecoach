import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string;
  public password:string;


  constructor(private _authService:AuthService,private _router:Router) { }

  ngOnInit() {
  }

  onLogin():void{

  	
  	this._authService.loginEmailUser(this.email,this.password)
  	  .then((res)=>{
  	  	this.onLoginRedirect();
  	  }).catch(err=>console.log('err',err.message));
	  
  }

  onLogout(){
  	return this._authService.logoutUser();
  }

  onLoginRedirect(){
  	this._router.navigate(['/profile']);

  }

}
