import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fullScreen:boolean = false;
  public isLogged:boolean = false;

  constructor(private router: Router,private _authService:AuthService, private _afsAuth:AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  doFullScreen() {
    function launchIntoFullscreen(element) {
    }
    function exitFullscreen() {   
    }

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
    this._authService.logoutUser();
    this.router.navigate(['/signin'])
   
  }




}
