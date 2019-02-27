import { Component, OnInit } from '@angular/core';
import { NgForm }               from "@angular/forms";
import { Router }               from "@angular/router";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	public email: string = '';
    public password: string = '';
    public remember:boolean = false;
    public errorMessage: string;
    public requesting: boolean = false;


  constructor(private router: Router) { }

  ngOnInit() {
  }


  signin(form: NgForm) {
  	this.router.navigateByUrl('/dashboard/home');
  }


}
