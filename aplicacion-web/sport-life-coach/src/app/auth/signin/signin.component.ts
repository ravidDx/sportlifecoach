import { Component, OnInit } from '@angular/core';
import { Router }               from "@angular/router";
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public remember:boolean = false;
  public errorMessage: string;
  public requesting: boolean = false;



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
    console.log('true');
    this._router.navigate(['/dashboard']);

  }


}
