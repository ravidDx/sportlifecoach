import { Injectable } from '@angular/core';
import {Dieta} from '../interfaces/dieta.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

//storage firebase
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  url = 'http://18.218.74.254';

  dietasUrl=this.url+":8080/api/dietas";
  dietaUrl=this.url+":8080/api/dieta";

  constructor(private _http:HttpClient, 
              private storage:AngularFireStorage) { }

  nuevaDieta(nuevo:Dieta):Observable<Dieta>{
    return this._http.post<Dieta>(this.dietaUrl,nuevo);
  }

  consultarDietas():Observable<Dieta[]>{
  	return this._http.get<Dieta[]>(this.dietasUrl);
  }

  editarDieta(dieta:Dieta,indice:string){
  	let url =`${this.dietaUrl}/${indice}`;
  	return this._http.put<Dieta>(url,dieta);
  }

  eliminarDieta(indice:string){
  	let url =`${this.dietaUrl}/${indice}`;
  	return this._http.delete(url);
  }

  verDieta(indice:string){
  	let url =`${this.dietaUrl}/${indice}`;
  	return this._http.get<Dieta>(url);
  }


  onUpload(data:any,id:any){
    const file = data;
    const filePath = `uploads/dieta_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
        
  }

  downloadUrl(id:any){
    const filePath = `uploads/dieta_${id}`;
    const imgRef = this.storage.ref(filePath);

    return imgRef.getDownloadURL();
  }

  
}
