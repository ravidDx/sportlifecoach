import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
//Interfas
import {Rutina} from '../../interfaces/rutina.interface';
//Servicios
import {RutinasService} from '../../servicios/rutinas.service';
import {StorageService} from '../../servicios/storage.service';


@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.page.html',
  styleUrls: ['./rutina.page.scss'],
})
export class RutinaPage implements OnInit {

  rutina: Rutina = {
    titulo: "",
    objetivo: "",
    ejercicios: [],
    duracion: "",
    dificultad: '',
    fechaCreacion: {},
    estado: '',
  }


  constructor(private _activateRute:ActivatedRoute,
    private _rutinaService:RutinasService,
    private _storageService:StorageService) { }

    ngOnInit() {
      let id = this._activateRute.snapshot.paramMap.get('id');
      this.consultarRutina(id);
      console.log(id);
    }


    consultarRutina(id:any){

      this._rutinaService.verRutina(id)
        .subscribe(
          data=>{
            console.log(data);
            let rutina = data
            this.rutina =  rutina;
            //this.getUrlsImg(ejercicio);
            // console.log(this.ejercicio,'mi');
  
          },
          error=>{
            console.log(error);
          }
    
        );
  
    }



}
