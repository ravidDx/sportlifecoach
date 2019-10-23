import { Injectable } from '@angular/core';
import {Ejercicio} from '../interfaces/ejercicio.interface';


//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjericicosService {

  url = window['urlApi'];
  
  entrenamientosUrl=this.url+":8080/api/entrenamientos";
  entrenamientoUrl=this.url+":8080/api/entrenamiento";

  constructor(private _http:HttpClient) { 

  }

  consultarEjercicios():Observable<Ejercicio[]>{
  	return this._http.get<Ejercicio[]>(this.entrenamientosUrl);
  }

  consultarEjercicio(indice:string){
  	let url =`${this.entrenamientoUrl}/${indice}`;
  	return this._http.get<Ejercicio>(url);
  }


}
