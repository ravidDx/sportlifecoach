import { Injectable }                   from "@angular/core";
import { Http, Request, RequestMethod } from "@angular/http";
import { Observable }                   from 'rxjs/Observable';

import "rxjs/add/operator/map";

const AUTH_URL = 'https://api.tsq.me/';
const API_URL = 'https://api.tsq.me/api/';
const LS_KEY = 'currentUser';

@Injectable()
export class RestDataSource {
    auth_token: string;
    constructor(private http: Http){
        const currentUser = JSON.parse(localStorage.getItem(LS_KEY));
        if (currentUser) {
            this.auth_token = currentUser.token;
        }
    }

    private sendRequest(verb: RequestMethod, path: string, body: any, auth:boolean = false):Observable<any> {
        let request = new Request({
            method: verb,
            url: API_URL + path,
            body: body
        });
        if (auth && this.auth_token) {
          request.headers.set('Authorization', `Bearer ${this.auth_token}`)
        }
        return this.http.request(request).map(response=>response.json());

    }

    signin(email: string, password: string):Observable<boolean> {
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: AUTH_URL + 'user/signin',
            body: {email, password}
        })).map(response => {
            // login successful if there's a jwt token in the response
            const json = response.json();
            let token = json.token;
            if (token) {
              this.auth_token = token;
              localStorage.setItem(LS_KEY, JSON.stringify({email: email, token: token, id: json.id}));
              // return true to indicate successful login
                return true;
            } else {
              // return false to indicate failed login
                return false;
            }
        });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.auth_token = null;
        localStorage.removeItem(LS_KEY);
    }

    signup(email: string, password: string):Observable<boolean> {
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: AUTH_URL + 'user/signup',
            body: {email, password}
        })).map(response => {
            const json = response.json();
            let token = json.token;
            if (token) {
                this.auth_token = token;
                localStorage.setItem(LS_KEY, JSON.stringify({email: email, token: token, id: json.id}));
                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        });
    }

    forgotPassword(email: string):Observable<string> {
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: AUTH_URL + 'user/forgotpassword',
            body: {email}
        })).map(response => {
            let r = response.json();
            return r.msg;
        });
    }

    resetPassword(password: string, token: string):Observable<string> {
        let request = new Request({
            method: RequestMethod.Post,
            url: AUTH_URL + "user/resetpassword",
            body: {password}
        });
        request.headers.set('Authorization', `Bearer ${token}`);
        return this.http.request(request).map(response=>response.json());
    }

    getModel(model:any, _id: string): Observable<any> {
        return this.sendRequest(RequestMethod.Get, `${model}/${_id}`, null, true);
    }
    getModels(model:any, param: any): Observable<any[]> {
        return this.sendRequest(RequestMethod.Get, `${model}?limit=${param.limit}&skip=${param.skip}`, null, true);
    }
    deleteModel(model:any, _id: string): Observable<any> {
        return this.sendRequest(RequestMethod.Delete, `${model}/${_id}`, null, true);
    }
    saveModel(model:any, obj: any): Observable<any> {
        return this.sendRequest(RequestMethod.Post, `${model}`, obj, true);
    }
    updateModel(model:any, obj: any): Observable<any> {
        return this.sendRequest(RequestMethod.Put, `${model}/${obj._id}`, obj, true);
    }

    getAmount(model): Observable<any> {
        return this.sendRequest(RequestMethod.Get, `other/amount?model=${model}`, null, true);
    }
    getUserInfo():Observable<any> {
        return this.sendRequest(RequestMethod.Get, 'other/userInfo', null, true);
    }
    updateUserInfo(param:any):Observable<any> {
        return this.sendRequest(RequestMethod.Post, 'other/userInfo', param, true);
    }
}
