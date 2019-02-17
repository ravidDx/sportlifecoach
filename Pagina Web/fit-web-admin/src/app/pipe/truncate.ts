// https://scotch.io/tutorials/create-a-globally-available-custom-pipe-in-angular-2
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform{
    transform(value: string, args: number):string {
        if (!value || !args) {
          return value;
        }
        let limit = args;
        let trail = '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}