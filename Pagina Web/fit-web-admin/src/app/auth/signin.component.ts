import { Component, OnInit }            from '@angular/core';
import { NgForm }               from "@angular/forms";
import { Router }               from "@angular/router";
import { RestDataSource }       from "../service/rest.datasource";
import { Base64Service } from "../service/base64.service";

@Component({
    moduleId: module.id,
    templateUrl: './signin.component.html',
    styleUrls: ['./auth.css']
})
export class SigninComponent implements OnInit{
    public email: string = '';
    public password: string = '';
    public remember:boolean = false;
    public errorMessage: string;
    public requesting: boolean = false;
    constructor(private api: RestDataSource, private router: Router, private base64: Base64Service) {}
    signin(form: NgForm) {
        if (form.valid) {
            this.errorMessage = null;
            this.requesting = true;
            this.api.signin(this.email, this.password)
                .subscribe(() => {
                    this.router.navigateByUrl('/dashboard');
                    this.requesting = false;
                }, error => {
                    this.errorMessage = error.json().msg;
                    this.requesting = false;
                });
            if(this.remember) {
                localStorage.setItem('login', JSON.stringify({email: this.email, password: this.base64.code('encode', this.password)}))
            } else {
                localStorage.removeItem('login');
            }
        } else {
            this.errorMessage = 'Form Data Invalid';
        }
    }
    ngOnInit(): void {
        const local = localStorage.getItem('login');
        if (local) {
          const { email, password } = JSON.parse(local);
          this.email = email;
          this.password = this.base64.code('decode', password);
          this.remember = true;
        }
    }
}