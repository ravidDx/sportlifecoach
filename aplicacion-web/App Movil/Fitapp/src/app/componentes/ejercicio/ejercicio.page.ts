import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Interfas
import {Ejercicio} from '../../interfaces/ejercicio.interface';
//Servicios
import {EjericicosService} from '../../servicios/ejericicos.service';
import {StorageService} from '../../servicios/storage.service';


@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.page.html',
  styleUrls: ['./ejercicio.page.scss'],
})
export class EjercicioPage implements OnInit {

  ejercicio:Ejercicio = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagenes:[],
    portada:'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg',
    series:'',
    repeticiones:'',
    duracion:''
  }




  constructor(private _activateRute:ActivatedRoute,
              private _ejercicioService:EjericicosService,
              private _storageService:StorageService) { }

  ngOnInit() {
    let id = this._activateRute.snapshot.paramMap.get('id');
    this.consultarEjercicio(id);
    //console.log(id);
  }


  consultarEjercicio(id:any){

    var _this = this;
    this._ejercicioService.consultarEjercicio(id)
      .subscribe(
        data=>{
          //console.log(data['entrenamiento'])
          this.ejercicio = data['entrenamiento'];
        

          this.ejercicio.imagenes.forEach( function(item, indice, array) {

            _this._storageService.downloadUrl(item).subscribe(
              data=>{
                _this.ejercicio.imagenes[indice] = data;
                if(indice == 0){
                  
                  _this.ejercicio.portada = data ;
                }
              },
              error=>{
                console.log('ERROR');
                
              }
              
            );

          
            
          });

        
          console.log(this.ejercicio);


        },
        error=>{
          console.log(error);
        }
  
      );

  }

}
