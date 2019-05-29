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
    altura:""
  }


  constructor(private _deportistaService:DeportistaService, private _activeRoute:ActivatedRoute) {
    
    this._activeRoute.params.subscribe(
      params =>{
        console.log(params['_id']);
        this._deportistaService.verDeportista(params['_id']).subscribe(
          data=>{
            //console.log(data);
            this.deportista=data['deportista'];
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


}
