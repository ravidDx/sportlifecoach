import { Injectable } from '@angular/core';
import {Deportista} from '../interfaces/deportista.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeportistaService {


  deportistasUrl="https://miapp-158221.firebaseio.com/deportistas.json";
  deportistaUrl="https://miapp-158221.firebaseio.com/deportistas";

  
  constructor(private _http:HttpClient) { }

  nuevoDeportista(nuevo:Deportista):Observable<Deportista>{
    return this._http.post<Deportista>(this.deportistasUrl,nuevo);
  }

  consultarDesportistas():Observable<Deportista[]>{
  	return this._http.get<Deportista[]>(this.deportistasUrl);
  }


  editarDeportista(deportista:Deportista,indice:string){

  	let url =`${this.deportistaUrl}/${indice}.json`;
  	return this._http.put<Deportista>(url,deportista);

  }

  eliminarDeportista(indice:string){
  	let url =`${this.deportistaUrl}/${indice}.json`;
  	return this._http.delete(url);
  }

  verDeportista(indice:string){

  	let url =`${this.deportistaUrl}/${indice}.json`;
  	return this._http.get<Deportista>(url);

  }




}

