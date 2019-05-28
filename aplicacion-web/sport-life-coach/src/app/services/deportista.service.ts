import { Injectable } from '@angular/core';
import {Deportista} from '../interfaces/deportista.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeportistaService {

  deportistasUrl="https://api-tesis-ravid87.c9users.io:8080/api/deportistas";
  deportistaUrl="https://api-tesis-ravid87.c9users.io:8080/api/deportista";


  constructor(private _http:HttpClient) { }

  nuevoDeportista(nuevo:Deportista):Observable<Deportista>{
    return this._http.post<Deportista>(this.deportistaUrl,nuevo);
  }

  consultarDesportistas():Observable<Deportista[]>{
  	return this._http.get<Deportista[]>(this.deportistasUrl);
  }

  editarDeportista(deportista:Deportista,indice:string){
  	let url =`${this.deportistaUrl}/${indice}`;
  	return this._http.put<Deportista>(url,deportista);
  }

  eliminarDeportista(indice:string){
  	let url =`${this.deportistaUrl}/${indice}`;
  	return this._http.delete(url);
  }

  verDeportista(indice:string){
  	let url =`${this.deportistaUrl}/${indice}`;
  	return this._http.get<Deportista>(url);
  }

}
