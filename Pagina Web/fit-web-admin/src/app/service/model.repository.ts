import { Injectable }       from "@angular/core";
import { Observable }       from 'rxjs/Observable';
import { RestDataSource }   from "./rest.datasource";

@Injectable()
export class PhotoRepository {
    models: any[] = [];
    amount: number = 0;
    constructor(private dataSource: RestDataSource) {
        this.dataSource.getModels('photo', {skip:0, limit: 10}).
        subscribe(data => {
            this.models = data;
        });
        this.dataSource.getAmount('photo').subscribe(data => {
            this.amount = data.amount;
        });
    }
    getModels(): any[] {
        return this.models;
    }
    getAmount(): number {
        return this.amount;
    }
    getModel(id: string): any {
        return this.models.find(p => p._id == id);
    }
    getModelFromServer(model:string, id: string):Observable<any> {
        return this.dataSource.getModel(model, id);
    }

    saveModel(modelName:string, model: any) {
        this.dataSource.saveModel(modelName, model)
            .subscribe(p => {
                this.models.push(p);
                this.amount = this.amount + 1;
            });
    }
    updateModel(modelName:string, model: any) {
        this.dataSource.updateModel(modelName, model)
            .subscribe(p => { this.models.splice(this.models.findIndex(p => p._id == model._id), 1, model);});
    }
    deleteModel(modelName: string, id: string) {
        this.dataSource.deleteModel(modelName, id).subscribe(p => {
            this.models.splice(this.models.findIndex(p => p._id == id), 1);
            this.amount = this.amount - 1;
        });
    }
}

@Injectable()
export class VideoRepository {
    models: any[] = [];
    amount: number = 0;
    constructor(private dataSource: RestDataSource) {
        this.dataSource.getModels('video', {skip:0, limit: 10}).
        subscribe(data => {
            this.models = data;
        });
        this.dataSource.getAmount('video').subscribe(data => {
            this.amount = data.amount;
        });
    }
    getModels(): any[] {
        return this.models;
    }
    getAmount(): number {
        return this.amount;
    }
    getModel(id: string): any {
        return this.models.find(p => p._id == id);
    }
    getModelFromServer(model:string, id: string):Observable<any> {
        return this.dataSource.getModel(model, id);
    }

    saveModel(modelName:string, model: any) {
        this.dataSource.saveModel(modelName, model)
            .subscribe(p => {
                this.models.push(p);
                this.amount = this.amount + 1;
            });
    }
    updateModel(modelName:string, model: any) {
        this.dataSource.updateModel(modelName, model)
            .subscribe(p => { this.models.splice(this.models.findIndex(p => p._id == model._id), 1, model);});
    }
    deleteModel(modelName: string, id: string) {
        this.dataSource.deleteModel(modelName, id).subscribe(p => {
            this.models.splice(this.models.findIndex(p => p._id == id), 1);
            this.amount = this.amount - 1;
        });
    }
}

@Injectable()
export class MusicRepository {
    models: any[] = [];
    amount: number = 0;
    constructor(private dataSource: RestDataSource) {
        this.dataSource.getModels('music', {skip:0, limit: 10}).
        subscribe(data => {
            this.models = data;
        });
        this.dataSource.getAmount('music').subscribe(data => {
            this.amount = data.amount;
        });
    }
    getModels(): any[] {
        return this.models;
    }
    getAmount(): number {
        return this.amount;
    }
    getModel(id: string): any {
        return this.models.find(p => p._id == id);
    }
    getModelFromServer(model:string, id: string):Observable<any> {
        return this.dataSource.getModel(model, id);
    }

    saveModel(modelName:string, model: any) {
        this.dataSource.saveModel(modelName, model)
            .subscribe(p => {
                this.models.push(p);
                this.amount = this.amount + 1;
            });
    }
    updateModel(modelName:string, model: any) {
        this.dataSource.updateModel(modelName, model)
            .subscribe(p => { this.models.splice(this.models.findIndex(p => p._id == model._id), 1, model);});
    }
    deleteModel(modelName: string, id: string) {
        this.dataSource.deleteModel(modelName, id).subscribe(p => {
            this.models.splice(this.models.findIndex(p => p._id == id), 1);
            this.amount = this.amount - 1;
        });
    }
}

@Injectable()
export class StoryRepository {
    models: any[] = [];
    amount: number = 0;
    constructor(private dataSource: RestDataSource) {
        this.dataSource.getModels('story', {skip:0, limit: 10}).
        subscribe(data => {
            this.models = data;
        });
        this.dataSource.getAmount('story').subscribe(data => {
            this.amount = data.amount;
        });
    }
    getModels(): any[] {
        return this.models;
    }
    getAmount(): number {
        return this.amount;
    }
    getModel(id: string): any {
        return this.models.find(p => p._id == id);
    }
    getModelFromServer(model:string, id: string):Observable<any> {
        return this.dataSource.getModel(model, id);
    }

    saveModel(modelName:string, model: any) {
        this.dataSource.saveModel(modelName, model)
            .subscribe(p => {
                this.models.push(p);
                this.amount = this.amount + 1;
            });
    }
    updateModel(modelName:string, model: any) {
        this.dataSource.updateModel(modelName, model)
            .subscribe(p => { this.models.splice(this.models.findIndex(p => p._id == model._id), 1, model);});
    }
    deleteModel(modelName: string, id: string) {
        this.dataSource.deleteModel(modelName, id).subscribe(p => {
            this.models.splice(this.models.findIndex(p => p._id == id), 1);
            this.amount = this.amount - 1;
        });
    }
}