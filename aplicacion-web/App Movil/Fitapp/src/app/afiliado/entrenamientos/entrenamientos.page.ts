import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  planEntrenamientos:PlanEntrenamiento[]=[];


  constructor(private _planEntrenamientoService:EntrenamientosService,private _router:Router) {
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


  
  viewItem(item:any){
    //console.log(item)
    var id =  item['rutina']['_id'];
    console.log(id);
    this._router.navigate(['/rutina', id ]);
  }



}
