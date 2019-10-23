import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Interfas
import {Dieta} from '../../interfaces/dieta.interface';
//Servicios
import {DietasService} from '../../servicios/dietas.service';
import {StorageService} from '../../servicios/storage.service';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
})
export class DietaPage implements OnInit {

  dieta:Dieta = {
    tipo:"",
    titulo:"",
    objetivo:"",
    tiempo:"",
    dificultad:"",
	  porciones:"",
    ingredientes:[],
    preparacion:[],
    imagen:''
  }


  constructor(private _activateRute:ActivatedRoute,
              private _dietasService:DietasService,
              private _storageService:StorageService) { }

    ngOnInit() {
      let id = this._activateRute.snapshot.paramMap.get('id');
      this.consultarDieta(id);
      console.log(id);
    }



    consultarDieta(id:any){

      var _this = this;
      this._dietasService.consultarDieta(id)
        .subscribe(
          data=>{
            //console.log(data['entrenamiento'])
            this.dieta = data['dieta'];
            
              let idImg = this.dieta.imagen;
  
              _this._storageService.downloadUrlDieta(idImg).subscribe(
                data=>{
                  _this.dieta.imagen= data;
                  
                },
                error=>{
                  console.log('ERROR');
                  
                }
                
              );
  
            console.log(this.dieta);
  
  
          },
          error=>{
            console.log(error);
          }
    
        );
  
    }

  

}
