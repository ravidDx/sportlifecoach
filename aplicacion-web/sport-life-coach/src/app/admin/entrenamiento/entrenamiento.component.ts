import { Component, OnInit } from '@angular/core';
import {PlanEntrenamientoService} from '../../services/plan-entrenamiento.service';
import {ActivatedRoute, Router} from '@angular/router';

import {PlanEntrenamiento} from '../../interfaces/planEntrenamiento.interface';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss']
})
export class EntrenamientoComponent implements OnInit {

  imagenes:any = [];
  cargar:boolean=false;

  planEntrenamiento:PlanEntrenamiento = {
    deportista:{},
    rutinas:[],
    duracion:"",
    fechaCreacion:{},
    estado:'',
    progreso:'',
  }

  estado='Activo';

  entrenamiento:any=[];

  listDias:any=[
    {
      dia:'Lunes',
      valor:'Descanso'
    },
    {
      dia:'Martes',
      valor:'Descanso'
    },
    {
      dia:'Miercoles',
      valor:'Descanso'
    },
    {
      dia:'Jueves',
      valor:'Descanso'
    },
    {
      dia:'Viernes',
      valor:'Descanso'
    },
    {
      dia:'Sabado',
      valor:'Descanso'
    }
    ,
    {
      dia:'Domingo',
      valor:'Descanso'
    }
  ]


  constructor(private _planEntrenamientoService:PlanEntrenamientoService, private _activeRoute:ActivatedRoute) { 
    
    this._activeRoute.params.subscribe(
      params =>{
        this._planEntrenamientoService.verPlanEntrenamiento(params['_id']).subscribe(
          data=>{

            console.log(data)
            this.planEntrenamiento=data;

            this.estado = this.planEntrenamiento.estado;

            for(let key$ in data.rutinas){
              let dias = data.rutinas[key$].dias;

              let listDiasCopy = Object.assign({},this.listDias);
                for(let key1$ in dias){
                    
          
                    for(let key2$ in listDiasCopy){

                      let obj=listDiasCopy[key2$];

                      if(obj.dia == dias[key1$] ){
                        obj.valor=data.rutinas[key$].rutina.titulo;
                      }

                  
                      
                    }
                }

                this.entrenamiento.push(listDiasCopy)

             }

             console.log(this.entrenamiento)

            
            



          },
          error=>{
            console.log(error);
          }

        );
        
      });

    }


  ngOnInit() {
  }

}
