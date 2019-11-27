import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatTable} from '@angular/material';


/*Interfaces */
import {Rutina} from '../../interfaces/rutina.interface';
import {Entrenamiento} from '../../interfaces/entrenamiento.interface';

/*sERVICIOS */
import {EntrenamientoService} from '../../services/entrenamiento.service';
import {ToasterService} from '../../services/toaster.service';
import {RutinaService} from '../../services/rutina.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})
export class RutinasComponent implements OnInit {

  //Datatable
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTable') myTable: MatTable<any>;

  titleConfirm='';

  displayedColumns: string[] = ['position','titulo','duracion', 'dificultad', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Rutina>();


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
   rutinas:Rutina[]=[];

   listaEjercicios:any[]=[];
   listEjerRutina:any[]=[];

   listEjerRutinaEdit:any[]=[];


   constructor(private _entrenamientoService:EntrenamientoService,
              private _rutinaService:RutinaService,
               private _toasterService:ToasterService)
  {
    this.listarEjercicios();

    this.listar();

  }

  ngOnInit() {
  }



  guardar(){

    this.rutina.estado='Activo';
    this.rutina.fechaCreacion=this.getFechaActual();
    this.rutina.ejercicios = this.listEjerRutina;

    this.nuevaRutina();





    console.log(this.rutina);

  }


   //Metodo guardar entrenamiento
   nuevaRutina(){
    this._rutinaService.nuevaRutina(this.rutina).subscribe(
      data=>{
        
        this._toasterService.Success('Rutina guardado OK !!');
        

      },
      error=>{
        console.log('ERROR');
        this._toasterService.Error(' Error al guardar !!');
        console.log(error);
     
      
      }

    );
  }

  listar(){
    this.rutinas=[];
    this._rutinaService.consultarRutinas()
      .subscribe(
        data=>{

          console.log(data)

          for(let key$ in data){
	  				let rutina = data[key$];
	  				rutina['_id']=key$;
	  				this.rutinas.push(rutina);
          }
        
          this.dataSource.data = this.rutinas;
          this.dataSource.paginator = this.paginator;

          console.log(this.dataSource.data)
                 
        },
        error=>{
          console.log(error);
        }

      );

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
              this.getUrlsImg(entrenamiento);
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
  //Obtencion de fecha
  addZero(i:any){
      if (i < 10) {
        i = '0' + i;
    }
    return i;
  }
  

  //Devuelve la url de la imagen
  getUrlsImg(deportista:any){
    deportista['idImg']=deportista['imagen'];
    this._entrenamientoService.downloadUrl(deportista['imagen']).subscribe(
      data=>{
        deportista['imagen']=data;   
          
      },
      error=>{
        console.log('ERROR');
        console.log(error);
        
      }
    );

    deportista['imagen'] = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';

}

}
