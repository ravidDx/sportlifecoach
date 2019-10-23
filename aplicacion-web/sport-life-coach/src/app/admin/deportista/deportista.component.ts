import { Component, OnInit } from '@angular/core';
import {DeportistaService} from '../../services/deportista.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Deportista} from '../../interfaces/deportista.interface';


@Component({
  selector: 'app-deportista',
  templateUrl: './deportista.component.html',
  styleUrls: ['./deportista.component.scss']
})
export class DeportistaComponent implements OnInit {

  deportista:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:"",
    peso:"",
    altura:"",
    foto:"",
    genero:"",
    objetivo:"",
    observaciones:"",
    rol:""
  }

  edad;


  constructor(private _deportistaService:DeportistaService, private _activeRoute:ActivatedRoute) {
    
    this._activeRoute.params.subscribe(
      params =>{
        console.log(params['_id']);
        this._deportistaService.verDeportista(params['_id']).subscribe(
          data=>{
            //console.log(data);
            this.deportista=data['deportista'];

            this.calcularEdad(this.deportista.fechaN[0])
            
            console.log(this.deportista);
          },
          error=>{
            console.log(error);
          }

        );
        
      });


   }

  ngOnInit() {
  }	

  calcularEdad(FechaNacimiento) {
             
    var fechaNace:any = new Date(FechaNacimiento);
    var fechaActual:any = new Date()
    
    var mes = fechaActual.getMonth()+1;
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();
     
    
    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    this.edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    console.log(this.edad)
        
  }
       




}
