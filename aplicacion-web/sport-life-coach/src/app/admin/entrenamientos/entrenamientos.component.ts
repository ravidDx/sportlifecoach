import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatTable} from '@angular/material';


/*Interfaces */
import {Rutina} from '../../interfaces/rutina.interface';
import {Deportista} from '../../interfaces/deportista.interface';
import {PlanEntrenamiento} from '../../interfaces/planEntrenamiento.interface';

/*sERVICIOS */
import {ToasterService} from '../../services/toaster.service';
import {RutinaService} from '../../services/rutina.service';
import {DeportistaService} from '../../services/deportista.service';
import {PlanEntrenamientoService} from '../../services/plan-entrenamiento.service';


@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.component.html',
  styleUrls: ['./entrenamientos.component.scss']
})
export class EntrenamientosComponent implements OnInit {

    //Datatable
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTable') myTable: MatTable<any>;

  titleConfirm='';
  
  displayedColumns: string[] = ['position','nombre','apellido', 'progreso', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<PlanEntrenamiento>();  
  
  new:boolean = true;

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

  dias: string[] = ['Lunes','Martes','Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  
  semanas: string[] = ['Semana 1','Semana 2','Semana 3', 'Semana 4', 'Semana 5', 'Semana 6','Semana 7','Semana 8','Semana 9', 'Semana 10', 'Semana 11', 'Semana 12'];

  rutinas:Rutina[]=[];
  deportistas:Deportista[] =[];
  
  listEntrenamientos:any[]=[];

  listRutinasEntr:any[]=[];

  listRutinas:any[]=[];

  deportistasAsignados:any[]=[];





  constructor(private _rutinaService:RutinaService,
              private _deportistaService:DeportistaService,
              private _planEntrenamientoService:PlanEntrenamientoService,
              private _toasterService:ToasterService) { 
    
    this.listar();
    this.listarRutinas();
    this.listarDeportistas();
    
  }

  ngOnInit() {

  }


  listar(){
    
    
    this._planEntrenamientoService.consultarPlanEntrenamientos()
      .subscribe(
        data=>{

      

          for(let key$ in data){
	  				let planEntrenamiento = data[key$];
            planEntrenamiento['_id']=key$;
	  				this.planEntrenamientos.push(planEntrenamiento);
          }
        
          this.dataSource.data = this.planEntrenamientos;
          this.dataSource.paginator = this.paginator;

          console.log(this.planEntrenamientos)

          //console.log(this.dataSource.data)
                 
        },
        error=>{
          console.log(error);
        }

      );

  }


  listarRutinas(){
    this.rutinas=[];
    this._rutinaService.consultarRutinas()
      .subscribe(
        data=>{

          for(let key$ in data){
	  				let rutina = data[key$];
	  				rutina['_id']=key$;
	  				this.rutinas.push(rutina);
          }

          console.log(this.rutinas)
           

                 
        },
        error=>{
          console.log(error);
        }

      );

  }


  listarDeportistas(){
    this.deportistas=[];
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data=>{

          for(let key$ in data){
	  				let deportista = data[key$];
	  				deportista['_id']=key$;
	  				this.deportistas.push(deportista);
          }

          console.log(this.deportistas)
        
                 
        },
        error=>{
          console.log(error);
        }

      );

  }


  newModal(){

  }

  guardar(){
    console.log('*******************************')

  
    var listRutinasEntr = this.listRutinasEntr;
    var estado =  'Activo';
    var progreso  = '0 %';
    var fecha =  this.getFechaActual();

    for(let $key in this.deportistasAsignados){

      var planEntrenamiento:PlanEntrenamiento = {
        deportista:this.deportistasAsignados[$key],
        rutinas:listRutinasEntr,
        duracion:"",
        fechaCreacion:fecha,
        estado:estado,
        progreso:progreso,
      }

      this.nuevoPlanEntrenamiento(planEntrenamiento);
    
    }

  }
  

     //Metodo guardar entrenamiento
     nuevoPlanEntrenamiento(planEntrenamiento:PlanEntrenamiento){
      this._planEntrenamientoService.nuevoPlanEntrenamiento(planEntrenamiento).subscribe(
        data=>{
          
          //this._toasterService.Success('Entrenamiento guardado OK !!');
          
        },
        error=>{
          console.log('ERROR');
          this._toasterService.Error(' Error al guardar !!');
          console.log(error);
       
        
        }
  
      );
    }
  



  addRutina(event:any){
    //console.log(this.listaEjercicios);
    this.listRutinasEntr=[];
   
    //this.entrenamientos=[];
    for(let $key in this.listRutinas){
      
        let data:any={
          rutina:this.listRutinas[$key],
          dias:[],
          semanas:[],
      
        }
        this.listRutinasEntr.push(data);
    }
  
    

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
  //Obtencion de fecha
  addZero(i:any){
      if (i < 10) {
        i = '0' + i;
    }
    return i;
  }
  



}
