import { Component, OnInit } from '@angular/core';
import {EntrenamientoService} from '../../services/entrenamiento.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Entrenamiento} from '../../interfaces/entrenamiento.interface';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent implements OnInit {

  imagenes:any = [];
  cargar:boolean=false;

  entrenamiento:Entrenamiento = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagenes:[],
    portada:'',
    series:'',
    repeticiones:'',
    duracion:''
  }


  constructor(private _entrenamientoService:EntrenamientoService, private _activeRoute:ActivatedRoute) { 

    this._activeRoute.params.subscribe(
      params =>{
        this._entrenamientoService.verEntrenamiento(params['_id']).subscribe(
          data=>{
            this.entrenamiento=data['entrenamiento'];
            this.cargarImagenes(this.entrenamiento.imagenes);
          },
          error=>{
            console.log(error);
          }

        );
        
      });

  }

  ngOnInit() {
  }

  cargarImagenes(imagenes:any){

    let _this = this;

    imagenes.forEach( function(item, indice, array) {
      _this._entrenamientoService.downloadUrl(item).subscribe(
        data=>{
          _this.imagenes.push(data);
          //console.log(indice);
          //console.log(data);
        },
        error=>{

          //console.log('ERROR');
          //console.log(error);
        }
      );
        
  });

  }

  

}
