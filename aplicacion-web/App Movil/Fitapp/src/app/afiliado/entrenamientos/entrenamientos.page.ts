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

 numeroTotalFinalizado=0;


  planEntrenamientos:PlanEntrenamiento[]=[];

      // para el botón 
      color="danger";
      text="Sin Terminar";
      btn:boolean=false;


  constructor(private _planEntrenamientoService:EntrenamientosService,private _router:Router) {
    this.email = localStorage.getItem('email');

    this.listar();
   }



  ngOnInit() {
  }


  
  editarProgreso(){

    this.btn=true;
    console.log(this.btn,'listo');
    if(this.btn){
      this.color="success";
      this.text="Finalizado"
    }
    /*
    console.log('editar progreso');
    let rutinas  = this.planEntrenamiento.rutinas;
    let numRutinas = 0;
    let progreso =0;
    for(let key$ in rutinas ){
      numRutinas=numRutinas+1;
    }
    console.log(numRutinas);

    let catidad = parseInt(localStorage.getItem('totalFinalizado'));

    
    
   progreso = (100*this.numeroTotalFinalizado) /numRutinas;
*/
   this.planEntrenamiento.progreso = 50+'';

   let indice = this.planEntrenamiento['_id']

   this._planEntrenamientoService.editarPlanEntrenamiento(this.planEntrenamiento, indice).subscribe(
    data => {
 

    },
    error => {
  
    }

  );

   

 




  }


  
  viewItem(item:any){
    //console.log(item)
    var id =  item['rutina']['_id'];
    console.log(id);
    this._router.navigate(['/rutina', id ])
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


  listo(){
    this.btn=true;
    console.log(this.btn,'listo');
    if(this.btn){
      this.color="success";
      this.text="Finalizado"
    }

    

    this.numeroTotalFinalizado = parseInt(localStorage.getItem('totalFinalizado'));
    this.numeroTotalFinalizado = this.numeroTotalFinalizado + 1;

    localStorage.setItem('totalFinalizado',this.numeroTotalFinalizado+"");
    
  

    this.editarProgreso();

  }

  nolisto(){
    this.btn=false;
    console.log(this.btn,'nolisto');
    if(!this.btn){
      this.color="danger";
      this.text="Sin terminar"
    }
  }



}
