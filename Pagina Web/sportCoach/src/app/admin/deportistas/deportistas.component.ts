import { Component, OnInit } from '@angular/core';
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


  deportista:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:"",
    peso:"",
    altura:""
  }

  data:Deportista[] =[];
  deportistas:Deportista[] =[];

 
  constructor(private _deportistaService:DeportistaService) { 
    
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
      
  }

  listar(){
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data=>{
          
          for(let key$ in data){
            //console.log(data[key$]);
            let deportistaNew = data[key$];
            deportistaNew['id']=key$;
            this.data.push(data[key$]);
           
          }
          this.deportistas = this.data;
          this.dtTrigger.next();  
            
        },
        error=>{
          console.log(error);
        }

      );

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
