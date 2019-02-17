import { Component }            from '@angular/core';
import { NgForm }               from "@angular/forms";
import { RestDataSource }       from "../service/rest.datasource";

@Component({
    moduleId: module.id,
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./auth.css']
})
export class ForgotPasswordComponent {
    public email: string;
    public successMessage: string;
    public errorMessage: string;
    public requesting: boolean = false;
    constructor(private api: RestDataSource) {}
    forgotPassword(form: NgForm) {
        if (form.valid) {
            this.errorMessage = null;
            this.requesting = true;
            this.api.forgotPassword(this.email)
                .subscribe((msg) => {
                    this.requesting = false;
                    this.successMessage = msg;
                }, error => {
                    this.errorMessage = error.json().msg;
                    this.requesting = false;
                    this.successMessage = null;
                });
        } else {
            this.errorMessage = 'Form Data Invalid';
            this.successMessage = null;
        }
    }
}
