import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms'; 
import {Deportista} from '../../interfaces/deportista.interface';
import {DeportistaService} from '../../services/deportista.service';
import { Subject } from 'rxjs';

declare var  $: any;

@Component({
  selector: 'app-deportistas',
  templateUrl: './deportistas.component.html',
  styleUrls: ['./deportistas.component.css']
})
export class DeportistasComponent implements OnInit {

  closeResult: string;
  form:NgForm;

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  new:boolean;

  deportista:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:"",
    peso:"",
    altura:""
  }

  deportistaEdit:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:"",
    peso:"",
    altura:""
  }

  deportistasAux:Deportista[] =[];
  deportistas:Deportista[] =[];
 
  constructor(private _deportistaService:DeportistaService,private _router:Router) {     
    this.listar();
  }

  ngOnInit() {

    //DataTable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

  }


  guardar(){

    if(this.new==true){

      this._deportistaService.nuevoDeportista(this.deportista).subscribe(
        data=>{
          let deportistaNew = this.deportista;
          deportistaNew['id']=data['name'];
          this.deportistas.push(deportistaNew);
          this.listar();
       
          this.clearForm();
        },
        error=>{
          console.log(error);
        }
  
      );

    }else if(this.new==false){
      
      this._deportistaService.editarDeportista(this.deportistaEdit,this.deportistaEdit["id"]).subscribe(

        data=>{
          console.log(data);
          //this._router.navigate(['/pokemones']);

        },
        error=>{
          console.log(error);

        }
        
      );
      
    }
    
  }

  listar(){
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data=>{
          
          for(let key$ in data){
            //console.log(data[key$]);
            let deportistaNew = data[key$];
            deportistaNew['id']=key$;
            this.deportistasAux.push(data[key$]);
           
          }
          this.deportistas = this.deportistasAux;
          this.dtTrigger.next();  
            
        },
        error=>{
          console.log(error);
        }

      );

  }

  eliminar(indice:string, posicion:number){

  	this._deportistaService.eliminarDeportista(indice).
  		subscribe(
  			data=>{
  				console.log("Se elimino");
  				//this.pokedex.splice(posicion,1);

  			},
  			error=>{
  				console.log(error);
  			}

    );

  }

  mostrar(indice:string){

    //this._router.navigate(['/dashboard/perfil', indice]);
  }



  editModal(deportista:Deportista){
    this.new=false;
    this.deportistaEdit=deportista;
  }

  newModal(){
    this.new=true;
  }


  clearForm(){
    this.deportista.nombre="";
    this.deportista.apellido="";
    this.deportista.email="";
    this.deportista.telefono="";
    this.deportista.fechaN="";
    this.deportista.peso="";
    this.deportista.altura="";
  }

  

}
