import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { FormsModule }                from '@angular/forms';
import { HttpModule }                 from '@angular/http';
import { FileUploadModule }           from 'ng2-file-upload';
import { PaginationModule }           from 'ng2-bootstrap';

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

// service
import { RestDataSource }             from "./service/rest.datasource";
import { AuthService }                from "./service/auth.service";
import { Base64Service }              from "./service/base64.service";
import { AuthGuard }                  from "./guard/auth.guard";
import { AppComponent }               from './app.component';
import { AppRoutingModule }           from './app-routing.module';
import { PhotoRepository, VideoRepository, MusicRepository, StoryRepository } from "./service/model.repository";

// pipe
import { TruncatePipe }               from "./pipe/truncate";
import { FilterModelPipe }            from "./pipe/filter";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserComponent,
    ModelTableComponent,
    ModelEditorComponent,
    AmountComponent,
    FilterModelPipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    AppRoutingModule,
    PaginationModule.forRoot()
  ],
  providers: [
    RestDataSource,
    AuthService,
    Base64Service,
    PhotoRepository,
    VideoRepository,
    MusicRepository,
    StoryRepository,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
