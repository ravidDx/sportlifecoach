import { Component, OnInit }            from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm }                       from "@angular/forms";
import { RestDataSource }               from "../service/rest.datasource";

@Component({
    moduleId: module.id,
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./auth.css']
})
export class ResetPasswordComponent implements OnInit {
    public password: string;
    public successMessage: string;
    public errorMessage: string;
    public requesting: boolean = false;
    public token: string;
    constructor(private api: RestDataSource, private activatedRoute: ActivatedRoute) {}
    resetPassword(form: NgForm) {
        if (form.valid) {
            this.errorMessage = null;
            this.requesting = true;
            this.api.resetPassword(this.password, this.token)
                .subscribe(() => {
                    this.requesting = false;
                    this.successMessage = 'Reset successfully';

                }, error => {
                    this.errorMessage = 'Invalid_token';
                    this.requesting = false;
                    this.successMessage = null;
                });

        } else {
            this.errorMessage = 'Form Data Invalid';
            this.successMessage = null;
        }
    }
    ngOnInit() {
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let token = params['token'];
            this.token = token;
            console.log(token);
        });
    }
}