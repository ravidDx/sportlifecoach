import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Interfas
import {Dieta} from '../../interfaces/dieta.interface';
//Services
import {CategoriasService} from '../../servicios/categorias.service';
import {StorageService} from '../../servicios/storage.service';
import {DietasService} from '../../servicios/dietas.service';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.page.html',
  styleUrls: ['./dietas.page.scss'],
})
export class DietasPage implements OnInit {

  list: Array<number> = [1, 2 , 3 , 4];

  sliderConfig = {
    spaceBetween: 10,
    centeredSlide: true,
    slidesPerView: 1.6
  };

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

  dietas:Dieta[]=[];
  dietasCopy:Dieta[]=[];

  tiposDieta:any[] = [];

  dies

  tipo1='';

  constructor(private _dietaService:DietasService,
              private _storageService:StorageService,
              private _categoriaService:CategoriasService,
              private _router:Router) { 

      this.getDietas();
  }

  ngOnInit() {
  }


  //Metodo listar dietas
  getDietas(){
    console.log('get Dietas')
    var _this = this;
    this._dietaService.consultarDietas()
      .subscribe(
        data=>{
          
          data["dietas"].forEach( function(item, indice, array) {
            _this._storageService.downloadUrlDieta(item.imagen).subscribe(
              data=>{
                item.imagen=data;         
              },
              error=>{
                console.log('ERROR');
                
              }
              
            );

            //item.imagen = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';

            
          });

        this.dietas = data["dietas"];
        this.dietasCopy = data["dietas"];

        this.getCategoriasDieta();
        
        console.log(this.dietasCopy)

      },
        error=>{
          console.log(error);
        }

      );

  }


  getCategoriasDieta(){
    this.tiposDieta=[];
    this._categoriaService.getCategoriasDieta()
    .subscribe(
      data=>{
        
        for(let key$ in data){
          let catgNew = data[key$];
          catgNew['id']=key$;
          catgNew['longitud']=0;
          catgNew['dietas']=[];

          for(let pos in this.dietasCopy){
            let obj = this.dietasCopy[pos];
            
            if(obj['tipo'] == catgNew['nombre']  ){
              catgNew['longitud'] = catgNew['longitud'] + 1;
              catgNew['dietas'].push(obj);
            }
            
          }

        this.tiposDieta.push(catgNew); 
      }
      
      console.log(this.tiposDieta)
        
      },
      error=>{
        console.log(error);
      }

    );

  }


  viewItem(item:any){
    var id =  item['_id'];
    console.log(id);
    this._router.navigate(['/dieta', id ])
  }



}
