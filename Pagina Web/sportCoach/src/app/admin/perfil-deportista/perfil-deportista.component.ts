import { Component, OnInit } from '@angular/core';
import {DeportistaService} from '../../services/deportista.service';
import {ActivatedRoute, Router} from '@angular/router';

 
import {Deportista} from '../../interfaces/deportista.interface';

@Component({
  selector: 'app-perfil-deportista',
  templateUrl: './perfil-deportista.component.html',
  styleUrls: ['./perfil-deportista.component.css']
})
export class PerfilDeportistaComponent implements OnInit {

  deportista:Deportista;

  constructor(private _deportistaService:DeportistaService, private _activeRoute:ActivatedRoute) { 
    this._activeRoute.params.subscribe(
      params =>{
        this._deportistaService.verDeportista(params['id']).subscribe(
          data=>{
            this.deportista=data;
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
