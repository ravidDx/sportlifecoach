import { Injectable } from '@angular/core';
import {Dieta} from '../interfaces/dieta.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietasService {

  url = window['urlApi'];

  dietasUrl=this.url+":8080/api/dietas";
  dietaUrl=this.url+":8080/api/dieta";

  constructor(private _http:HttpClient) { }

  consultarDietas():Observable<Dieta[]>{
  	return this._http.get<Dieta[]>(this.dietasUrl);
  }

  consultarDieta(indice:string){
  	let url =`${this.dietaUrl}/${indice}`;
  	return this._http.get<Dieta>(url);
  }

}
