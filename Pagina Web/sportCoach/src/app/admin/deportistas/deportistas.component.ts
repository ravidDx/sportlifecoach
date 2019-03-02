import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'; 
import {Deportista} from '../../interfaces/deportista.interface';
import {DeportistaService} from '../../services/deportista.service';

//import {ActivatedRoute, Router} from '@angular/router';
declare var  $: any;


@Component({
  selector: 'app-deportistas',
  templateUrl: './deportistas.component.html',
  styleUrls: ['./deportistas.component.css']
})
export class DeportistasComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;
  closeResult: string;
  form:NgForm;

  id:string;
  model:string;

  deportista:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:"",
    peso:"",
    altura:""
  }

  constructor(private _deportistaService:DeportistaService,) { }

  ngOnInit() {
  	  //DataTable
  	this.dataTable = $(this.table.nativeElement);
  	//this.dataTable.dataTable();
    this.dataTable= $('#data').DataTable({ "language": {"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"}});
  }

  guardar(){

    this.clearForm();
    /*
   
    this._deportistaService.nuevoDeportista(this.deportista).subscribe(

      data=>{
        console.log(data);
        //this._router.navigate(['/pokemon', data['name']]);
        this.clearForm();
      },
      error=>{
        console.log(error);
      }

    );
    */

        
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
