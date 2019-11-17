import { Injectable } from '@angular/core';
import {Entrenamiento} from '../interfaces/entrenamiento.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

//storage firebase
import {AngularFireStorage} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  //url = window['urlApi'];
  /*
  entrenamientosUrl=this.url+":8080/api/entrenamientos";
  entrenamientoUrl=this.url+":8080/api/entrenamiento";
*/
  url = window['urlFirebase'];
  entrenamientosUrl=this.url+'entrenamientos.json';
  entrenamientoUrl=this.url+'entrenamientos';

  constructor(private _http:HttpClient, 
              private storage:AngularFireStorage) 
  {

   }


  nuevoEntrenamiento(nuevo:Entrenamiento):Observable<Entrenamiento>{
    return this._http.post<Entrenamiento>(this.entrenamientosUrl,nuevo);

  }

  consultarEntrenamientos():Observable<Entrenamiento[]>{
  	return this._http.get<Entrenamiento[]>(this.entrenamientosUrl);
  }

  editarEntrenamiento(entrenamiento:Entrenamiento,indice:string){
    
  	let url =`${this.entrenamientoUrl}/${indice}.json`;
  	return this._http.put<Entrenamiento>(url,entrenamiento);
  }

  eliminarEntrenamiento(indice:string){
  	let url =`${this.entrenamientoUrl}/${indice}`;
  	return this._http.delete(url);
  }

  verEntrenamiento(indice:string){
  	let url =`${this.entrenamientoUrl}/${indice}.json`;
  	return this._http.get<Entrenamiento>(url);
  }

     
  darBajaEntrenamiento(entrenamiento:Entrenamiento,indice:string){  
    let url =`${this.entrenamientoUrl}/${indice}.json`;
  	return this._http.put<Entrenamiento>(url,entrenamiento);
  }



  onUpload(data:any,id:any){
    const file = data;
    const filePath = `uploads/entrenamiento_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
        
  }

  downloadUrl(id:any){
    const filePath = `uploads/entrenamiento_${id}`;
    const imgRef = this.storage.ref(filePath);

    return imgRef.getDownloadURL();
  }



}
