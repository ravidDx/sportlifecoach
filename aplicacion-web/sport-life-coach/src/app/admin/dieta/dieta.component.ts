import { Component, OnInit } from '@angular/core';
import {DietaService} from '../../services/dieta.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dieta} from '../../interfaces/dieta.interface';


@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.scss']
})

export class DietaComponent implements OnInit {

  cargar:boolean=false;

  dieta:Dieta = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:"",
    ingredientes:[],
    preparacion:[]
  }


  constructor(private _dietaService:DietaService, private _activeRoute:ActivatedRoute) { 
    
    this._activeRoute.params.subscribe(
      params =>{
        console.log(params['_id']);
        this._dietaService.verDieta(params['_id']).subscribe(
          data=>{
            //console.log(data);
            //this.imagenes=data['entrenamiento']['imagenes'];
            //data['entrenamiento']['imagenes'] = [];
            let codImg = data['dieta'].imagen; 
            data['dieta'].imagen = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
            this.dieta=data['dieta'];
            
            this.cargarImagen(codImg);


            console.log(this.dieta);
          },
          error=>{
            console.log(error);
          }

        );
        
      });

  }

  ngOnInit() {
  }

  

  cargarImagen(item:any){

  
      this._dietaService.downloadUrl(item).subscribe(
        data=>{
          
          //console.log(indice);
          this.dieta.imagen= data;
          console.log(data);
        },
        error=>{
          //console.log('ERROR');
          //console.log(error);
        }
      );

      //console.log(_this.entrenamiento);

  }

  

}
