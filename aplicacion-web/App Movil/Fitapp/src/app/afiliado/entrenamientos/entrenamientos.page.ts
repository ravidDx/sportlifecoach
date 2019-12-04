import { Component, OnInit } from '@angular/core';

//Interfas
import {PlanEntrenamiento} from '../../interfaces/planEntrenamiento.interface';
//Services
import {EntrenamientosService} from '../../servicios/entrenamientos.service';


@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.page.html',
  styleUrls: ['./entrenamientos.page.scss'],
})
export class EntrenamientosPage implements OnInit {

  email:string = '';

  planEntrenamiento:PlanEntrenamiento = {
    deportista:{},
    rutinas:[],
    duracion:"",
    fechaCreacion:{},
    estado:'',
    progreso:'',
  }

  planEntrenamientoEdit:PlanEntrenamiento = {
    deportista:{},
    rutinas:[],
    duracion:"",
    fechaCreacion:{},
    estado:'',
    progreso:'',
  }

  planEntrenamientos:PlanEntrenamiento[]=[];


  constructor(private _planEntrenamientoService:EntrenamientosService,) {
    this.email = localStorage.getItem('email');

    this.listar();
   }



  ngOnInit() {
  }


  
  listar(){
    
    
    this._planEntrenamientoService.consultarPlanEntrenamientos()
      .subscribe(
        data=>{

         
          for(let key$ in data){
            let planEntrenamiento = data[key$];
            
            if(planEntrenamiento['deportista']['email'] == this.email){
              //console.log('entro 1 vez');
              planEntrenamiento['_id']=key$;
              this.planEntrenamiento = planEntrenamiento;
              break; //romper ciclo for
            }
           
	  				
          }
        
         
          console.log(this.planEntrenamiento)

                 
        },
        error=>{
          console.log(error);
        }

      );

  }

}
