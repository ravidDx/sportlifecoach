import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { AuthGuard }                  from "./guard/auth.guard";

// sign component
import { SigninComponent }            from './auth/signin.component';
import { SignupComponent }            from './auth/signup.component';
import { ForgotPasswordComponent }    from './auth/forgotpassword.component';
import { ResetPasswordComponent }     from './auth/resetpassword.component';

// dashboard component
import { DashboardComponent }         from './dashboard/dashboard.component';
import { AmountComponent }            from './dashboard/amount.component';
import { UserComponent }              from "./dashboard/user.component";
import { ModelTableComponent }        from "./dashboard/modelTable.component";
import { ModelEditorComponent }       from "./dashboard/modelEditor.component";

const routes: Routes = [
    { path: 'signin',           component: SigninComponent},
    { path: 'signup',           component: SignupComponent},
    { path: 'resetpassword',    component: ResetPasswordComponent},
    { path: 'forgotpassword',   component: ForgotPasswordComponent},
    { path: 'dashboard',        canActivate: [AuthGuard], component: DashboardComponent, children: [
        { path: 'amount',       component: AmountComponent},
        { path: 'user',         component: UserComponent},
        { path: ':model',       component: ModelTableComponent},
        { path: ':model/:mode', component: ModelEditorComponent},
        { path: ':model/:mode/:id',       component: ModelEditorComponent},
        { path: '**',           redirectTo: 'amount'},
    ]},
    { path: '**',               redirectTo: 'signin'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}