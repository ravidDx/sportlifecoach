import { Injectable }           from "@angular/core";
import { RestDataSource }       from './rest.datasource';
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {

    constructor(private datasource: RestDataSource) {}
    clear() {
        this.datasource.auth_token = null;
    }
}