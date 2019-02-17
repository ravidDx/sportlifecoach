import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { PhotoRepository, VideoRepository, MusicRepository, StoryRepository } from "../service/model.repository";
const UPLOAD_URL=`https://document.tsq.me/upload`;
const ASSET_PREFIXER = '//media-cdn.tsq.me/';

@Component({
    moduleId: module.id,
    templateUrl: 'modelEditor.component.html'
})
export class ModelEditorComponent {
    // photo relative variable
    photoPosterUploader:FileUploader;
    photoPicturesUploader:FileUploader;
    photoPosterUploading:boolean = false;
    photoPicturesUploading:boolean = false;
    posterUrl: string;


    // music relative variable
    musicPosterUploader:FileUploader;
    musicDownloadUrlUploader:FileUploader;
    musicPosterUploading:boolean = false;
    musicDownloadUrlUploading:boolean = false;

    // video relative variable
    videoPosterUploader:FileUploader;
    videoDownloadUrlUploader:FileUploader;
    videoPosterUploading:boolean = false;
    videoDownloadUrlUploading:boolean = false;
    
    // story relative variable
    storyPosterUploader:FileUploader;
    storyPosterUploading:boolean = false;
    
    // common variable
    editing: boolean = false;
    model: string;
    photo:any = {};
    video:any = {};
    music:any = {};
    story:any = {};
    constructor(
        private photoRepo: PhotoRepository,
        private videoRepo: VideoRepository,
        private musicRepo: MusicRepository,
        private storyRepo: StoryRepository,
                private router: Router,
                activeRoute: ActivatedRoute
    ) {
        this.editing = activeRoute.snapshot.params['mode'] == 'edit';
        const params = activeRoute.snapshot.params;
        const { model, mode, id } = params;
        // upload url
        const url = `${UPLOAD_URL}?userID=${JSON.parse(localStorage.getItem('currentUser')).id}&type=${model}`;
        this.model = model;
        if (mode === 'edit') {
            this.editing = true;
            let modelObject = {};
            switch (model) {
                case 'photo':
                    this.photo = modelObject;
                    break;
                case 'video':
                    this.video = modelObject;
                    break;
                case 'music':
                    this.music = modelObject;
                    break;
                case 'story':
                    this.story = modelObject;
                    break;
                default:
                    this.photo = modelObject;
            }
            const object = this.getCurrentRepo().getModel(id);
            if (object) {
                // get object table list
                Object.assign(modelObject, object);
            } else {
                // get object from server
                this.getCurrentRepo().getModelFromServer(model, id).subscribe(object => Object.assign(modelObject, object));
            }
        }


        if (model === 'photo') {
            this.photoPosterUploader = new FileUploader({url: url});
            //https://github.com/valor-software/ng2-file-upload/issues/399
            this.photoPosterUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
            this.photoPosterUploader.onSuccessItem = ((item, response: any): any => {
                this.photoPosterUploading = false;
                this.photoPosterUploader.queue = [];
                const filename = JSON.parse(response).filename;
                this.photo.posterUrl = ASSET_PREFIXER + filename;
            });

            this.photoPicturesUploader =  new FileUploader({url: url});
            this.photoPicturesUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
            this.photoPicturesUploader.onSuccessItem = ((item, response: any): any => {
                this.photoPicturesUploading = false;
                if (!this.photoPicturesUploader.getNotUploadedItems().length) {
                    this.photoPicturesUploader.queue = [];
                }
                const filename = JSON.parse(response).filename;
                if (!this.photo.pictures) {
                    this.photo.pictures = []
                }
                this.photo.pictures.push({downloadUrl:  ASSET_PREFIXER + filename, title: ''});
            });
        } else if (model === 'music') {
            this.musicPosterUploader = new FileUploader({url: url});
            this.musicPosterUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
            this.musicPosterUploader.onSuccessItem = ((item, response: any): any => {
                this.musicPosterUploading = false;
                this.musicPosterUploader.queue = [];
                const filename = JSON.parse(response).filename;
                this.music.posterUrl = ASSET_PREFIXER + filename;
            });
            this.musicDownloadUrlUploader = new FileUploader({url: url});
            this.musicDownloadUrlUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
            this.musicDownloadUrlUploader.onSuccessItem = ((item, response: any): any => {
                this.musicDownloadUrlUploading = false;
                this.musicDownloadUrlUploader.queue = [];
                const filename = JSON.parse(response).filename;
                this.music.downLoadUrl = ASSET_PREFIXER + filename;
            });
        } else if (model === 'video') {
            this.videoPosterUploader = new FileUploader({url: url});
            this.videoPosterUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
            this.videoPosterUploader.onSuccessItem = ((item, response: any): any => {
                this.videoPosterUploading = false;
                this.videoPosterUploader.queue = [];
                const filename = JSON.parse(response).filename;
                this.video.posterUrl = ASSET_PREFIXER + filename;
            });
            this.videoDownloadUrlUploader = new FileUploader({url: url});
            this.videoDownloadUrlUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
            this.videoDownloadUrlUploader.onSuccessItem = ((item, response: any): any => {
                this.videoDownloadUrlUploading = false;
                this.videoDownloadUrlUploader.queue = [];
                const filename = JSON.parse(response).filename;
                this.video.downLoadUrl = ASSET_PREFIXER + filename;
            });
        } else if (model === 'story') {
            this.storyPosterUploader = new FileUploader({url: url});
            this.storyPosterUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
            this.storyPosterUploader.onSuccessItem = ((item, response: any): any => {
                this.storyPosterUploading = false;
                this.storyPosterUploader.queue = [];
                const filename = JSON.parse(response).filename;
                this.story.posterUrl = ASSET_PREFIXER + filename;
            });
        }
    }

    getCurrentRepo():any {
        switch (this.model) {
            case 'photo':
                return this.photoRepo;
            case 'video':
                return this.videoRepo;
            case 'music':
                return this.musicRepo;
            case 'story':
                return this.storyRepo;
            default:
                return this.photoRepo;
        }
    }
    save(form: NgForm) {
        let currentObject = {};
        switch (this.model) {
            case 'photo':
                currentObject = this.photo;
                break;
            case 'video':
                currentObject = this.video;
                break;
            case 'music':
                currentObject = this.music;
                break;
            case 'story':
                currentObject = this.story;
                break;
            default:
                currentObject = this.photo;
        }
        if (this.editing) {
            this.getCurrentRepo().updateModel(this.model, currentObject);
        } else {
            this.getCurrentRepo().saveModel(this.model, currentObject);
        }
        this.router.navigateByUrl(`/dashboard/${this.model}`)
    }


    // photo relative
    deletePoster(url: string):void {
        this.photo.posterUrl = '';
    }
    deletePictures(url: string):void {
        const newPictures = this.photo.pictures.filter(item => item.downloadUrl != url);
        this.photo.pictures = newPictures;
    }
}