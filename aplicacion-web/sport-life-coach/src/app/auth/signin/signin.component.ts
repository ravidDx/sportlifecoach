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


  constructor(private _authService:AuthService,
              private _router:Router) { 
                this._authService.isAuth();
  }

  ngOnInit() {
  }

  onLogin():void{

  this._authService.loginEmailUser(this.email,this.password)
      .then((res)=>{
        console.log(res);
        this.getTipoUser();
       
      }).catch(err=>console.log('err',err.message));
    
  }

   onLogout(){
    return this._authService.logoutUser();
  }

  onLoginRedirect(){
    console.log('true');
    this._router.navigate(['/dashboard']);
  }


  
  getTipoUser(){
    
    this._authService.getTipoUser()
      .snapshotChanges()
      .subscribe(item =>{
        item.forEach(element =>
        {
          let data = element.payload.toJSON();
          if(data['email'] == this.email){
            console.log(data['rol']);
            localStorage.setItem('rol',data['rol']);
            this.onLoginRedirect();
          }
         
          //console.log(data['email']);
          //this.noticias[element.key]=data['detalle'];

        });
          
      })

  }

  

}
