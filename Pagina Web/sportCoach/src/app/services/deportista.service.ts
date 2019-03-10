import { Injectable } from '@angular/core';
import {Deportista} from '../interfaces/deportista.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeportistaService {


  deportistaUrl="https://miapp-158221.firebaseio.com/deportistas.json";

  constructor(private _http:HttpClient) { }

  nuevoDeportista(nuevo:Deportista):Observable<Deportista>{
    return this._http.post<Deportista>(this.deportistaUrl,nuevo);
  }

  consultarDesportistas():Observable<Deportista[]>{
  	return this._http.get<Deportista[]>(this.deportistaUrl);
  }


}

