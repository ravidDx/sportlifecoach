import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { RestDataSource } from "../service/rest.datasource";
const UPLOAD_URL=`https://document.tsq.me/upload`;
const ASSET_PREFIXER = '//media-cdn.tsq.me/';
@Component({
    moduleId: module.id,
    templateUrl: 'user.component.html'
})
export class UserComponent {
    avatarUploader:FileUploader;
    avatarUploading:boolean = false;
    info:any = {};
    updateSuccess:boolean = false;
    personUrl:string = '';
    email:string = '';
    constructor(
        private dataSource: RestDataSource
    ) {
        this.dataSource.getUserInfo().subscribe(data => {
            this.info = data;
        });
        this.personUrl = 'https://tsq.me';
        const {email, id} = JSON.parse(localStorage.getItem('currentUser'));
        if (id != '58d2506205a455427cd06830') {
          this.personUrl = `${this.personUrl}?id=${id}`;
        }
        this.email = email;

        this.avatarUploader = new FileUploader({url: `${UPLOAD_URL}?userID=${JSON.parse(localStorage.getItem('currentUser')).id}&type=user`});
        this.avatarUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.avatarUploader.onSuccessItem = ((item, response: any): any => {
            this.avatarUploading = false;
            this.avatarUploader.queue = [];
            const filename = JSON.parse(response).filename;
            this.info.avatarUrl = ASSET_PREFIXER + filename;
        });
    }

    update() {
        this.updateSuccess = false;
        this.dataSource.updateUserInfo(this.info).subscribe(data => {
            this.updateSuccess = true;
        })
    }
}