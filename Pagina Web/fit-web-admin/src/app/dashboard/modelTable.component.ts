import { Component} from "@angular/core";
import { PhotoRepository, VideoRepository, MusicRepository, StoryRepository } from "../service/model.repository";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { RestDataSource } from "../service/rest.datasource";
import 'rxjs/add/operator/filter';
@Component({
    moduleId: module.id,
    templateUrl: 'modelTable.component.html'
})
export class ModelTableComponent{
    public skip:number = 0;
    public limit:number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;
    public model:string;
    public searchPlaceHolder:string;
    public changePageSize(newSize: number) {
        this.limit = Number(newSize);
        this.search();
    }

    public pageChanged(event: any): void {
        this.currentPage = event.page;
        this.skip = (this.currentPage - 1) * this.limit;
        this.search();
    }

    setPlaceHolder():void {
        switch (this.model) {
            case 'photo':
                this.searchPlaceHolder = 'album & note';
                break;
            case 'music':
                this.searchPlaceHolder = 'name & note';
                break;
            case 'video':
                this.searchPlaceHolder = 'name & note';
                break;
            case 'story':
                this.searchPlaceHolder = 'title & content';
                break;
            default:
                this.searchPlaceHolder = 'note';
        }
    }
    constructor(
        private photoRepo: PhotoRepository,
        private videoRepo: VideoRepository,
        private musicRepo: MusicRepository,
        private storyRepo: StoryRepository,
                private dataSource: RestDataSource, activeRoute: ActivatedRoute, private router: Router){
        this.model = activeRoute.snapshot.params['model'];
        this.setPlaceHolder();
        //http://stackoverflow.com/questions/33520043/how-to-detect-a-route-change-in-angular-2
        router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event:NavigationStart) => {
                // You only receive NavigationStart events
                switch (event.url) {
                    case '/dashboard/photo':
                        this.model = 'photo';
                        break;
                    case '/dashboard/video':
                        this.model = 'video';
                        break;
                    case '/dashboard/music':
                        this.model = 'music';
                        break;
                    case '/dashboard/story':
                        this.model = 'story';
                        break;
                }
                this.setPlaceHolder();
            });

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
    getModels(): any[] {
        return this.getCurrentRepo().getModels();
    }
    getAmount(): any {
        return this.getCurrentRepo().getAmount();
    }

    // todo
    deleteModel(id: string) {
        this.getCurrentRepo().deleteModel(this.model, id);
    }
    search() {
        this.dataSource.getModels(this.model, {limit: this.limit, skip: this.skip}).subscribe(data => {
            this.getCurrentRepo().models = data;
        });
    }
}