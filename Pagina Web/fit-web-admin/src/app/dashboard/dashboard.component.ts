import { Component } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { PhotoRepository, VideoRepository, MusicRepository, StoryRepository } from "../service/model.repository";

@Component({
    moduleId: module.id,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    fullScreen:boolean = false;
    constructor(
        private photoRepo: PhotoRepository,
        private videoRepo: VideoRepository,
        private musicRepo: MusicRepository,
        private storyRepo: StoryRepository,
        private auth: AuthService, private router: Router) {}

    logout() {
        this.auth.clear();
        this.router.navigateByUrl('/');

        // do repo reset
        this.photoRepo.models = [];
        this.photoRepo.amount = 0;
        this.videoRepo.models = [];
        this.videoRepo.amount = 0;
        this.musicRepo.models = [];
        this.musicRepo.amount = 0;
        this.storyRepo.models = [];
        this.storyRepo.amount = 0;
    }

    doFullScreen() {

        const element = document.getElementById("wrapper");

        function launchIntoFullscreen(element) {
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        function exitFullscreen() {
            if(document.exitFullscreen) {
                document.exitFullscreen();
            } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        if (this.fullScreen) {
            exitFullscreen();
            this.fullScreen = false;
        } else {
            launchIntoFullscreen(element);
            this.fullScreen = true;
        }

    }
}