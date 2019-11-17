import { Component, OnInit } from '@angular/core';

/*Interfaces */
import {Rutina} from '../../interfaces/rutina.interface';
import {Entrenamiento} from '../../interfaces/entrenamiento.interface';

/*sERVICIOS */
import {EntrenamientoService} from '../../services/entrenamiento.service';
import {ToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})
export class RutinasComponent implements OnInit {




   new:boolean = true;
   duracionList=['10 min','20 min','30 min','40 min','50 min','1 hora','1 h 15 min','1 h 30 min' ,'1 h 45 min']
   descansoList=["10´´","20´´","30´´","40´´","50´´","60´´"]
   dificultadList:any=['Principiante','Medio','Avanzado'];

   rutina:Rutina = {
     titulo:"",
     objetivo:"",
     ejercicios:[],
     duracion:"",
     dificultad:'',
     fechaCreacion:{},
     estado:'',
   }
 
   rutinaEdit:Rutina = {
    titulo:"",
    objetivo:"",
    ejercicios:[],
    duracion:"",
    dificultad:'',
    fechaCreacion:{},
    estado:'',
   }



   entrenamientos:Entrenamiento[]=[];

   listaEjercicios:any[]=[];
   listEjerRutina:any[]=[];

   listEjerRutinaEdit:any[]=[];


   constructor(private _entrenamientoService:EntrenamientoService,
               private _toasterService:ToasterService)
  {
    this.listarEjercicios();

  }

  ngOnInit() {
  }



  guardar(){

    this.rutina.estado='Activo';
    this.rutina.fechaCreacion=this.getFechaActual();

    this.rutina.ejercicios = this.listEjerRutina;



    console.log(this.rutina);

  }

  newModal(){

  }


    //Metodo listar entrenamientos
    listarEjercicios(){

      this._entrenamientoService.consultarEntrenamientos()
        .subscribe(
          data=>{
            this.entrenamientos=[];
            for(let key$ in data){
              let entrenamiento = data[key$];
              entrenamiento['_id']=key$;
              this.entrenamientos.push(entrenamiento);
            }

            console.log(this.entrenamientos)
              
          },
          error=>{
            console.log(error);
          }
  
        );
  
  }

  addEjercicio(event:any){
    //console.log(this.listaEjercicios);
    this.listEjerRutina=[];
   
    //this.entrenamientos=[];
    for(let $key in this.listaEjercicios){
      
        let data:any={
          ejercicio:this.listaEjercicios[$key],
          series:'',
          repeticiones:'',
          descanso:''
        }
        this.listEjerRutina.push(data);
    }
    //console.log(this.listEjerRutina)
    

  }


  //Obtencion de fecha
  getFechaActual(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    
    dd=this.addZero(dd);
    mm=this.addZero(mm);

    let fecha = {
      dd:dd,
      mm:mm,
      yyyy:yyyy
    }

    return fecha;
  }

  addZero(i:any){
      if (i < 10) {
        i = '0' + i;
    }
    return i;
  }

}
