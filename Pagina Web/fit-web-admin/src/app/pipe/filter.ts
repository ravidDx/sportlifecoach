// https://scotch.io/tutorials/create-a-globally-available-custom-pipe-in-angular-2
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterModel',
    pure: false // http://stackoverflow.com/questions/34456430/ngfor-doesnt-update-data-with-pipe-in-angular2
})
export class FilterModelPipe implements PipeTransform{
    transform(value: any, args1:any, args2:any):any {
        if (args2 == undefined) {
            args2 = '';
        }
        switch (args1) {
            case 'photo':
                return value.filter(item => {
                    return item.album.indexOf(args2) !== -1 || item.note.indexOf(args2) !== -1
                });
            case 'music':
                return value.filter(item => {
                    return item.album.indexOf(args2) !== -1 || item.note.indexOf(args2) !== -1 || item.name.indexOf(args2) !== -1 || item.author.indexOf(args2) !== -1
                });
            case 'video':
                return value.filter(item => {
                    return item.name.indexOf(args2) !== -1 || item.note.indexOf(args2) !== -1
                });
            case 'story':
                return value.filter(item => {
                    return item.title.indexOf(args2) !== -1 || item.content.indexOf(args2) !== -1;
                });
        }
    }
}