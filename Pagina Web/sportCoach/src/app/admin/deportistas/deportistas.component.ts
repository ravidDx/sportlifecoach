import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'; 
import {Deportista} from '../../interfaces/deportista.interface';
import {DeportistaService} from '../../services/deportista.service';

import { Subject } from 'rxjs';


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

   dtOptions: DataTables.Settings = {};

  basic_table_data;

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

  rows;
  columns;
  dtTrigger: any = new Subject();

  deportistas:Deportista[] =[];

  data:any[] =["asd","asd","asd"  ];

  constructor(private _deportistaService:DeportistaService) { 
/*
    this.fetch((data) => {
      this.basic_table_data = data;
    });



*/

this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };


    this.listar();





    


  }


 /* fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `"https://miapp-158221.firebaseio.com/deportistas.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }*/




  ngOnInit() {

    




  	  //DataTable
  	//this.dataTable = $(this.table.nativeElement);
  	//this.dataTable.dataTable();
    //this.dataTable.DataTable(this.dtOptions);
    //this.dataTable= $('#data').DataTable({ "language": {"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"}});
  
    //$('#dtBasicExample').DataTable();
     //$('.dataTables_length').addClass('bs-select');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    //return body .data || {};
  }




  guardar(){
    this._deportistaService.nuevoDeportista(this.deportista).subscribe(
      data=>{
        console.log(data);
        //this._router.navigate(['/pokemon', data['name']]);
       //let deportistaNew = this.deportista;
       // deportistaNew['id']=data['name'];
        //this.deportistas.push(deportistaNew);
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
            this.deportistas.push(data[key$]);
          }
          console.log(this.deportistas);

          this.dtTrigger.next();

     

         
          /*
              $('#example').DataTable( {
                "data":  this.deportistas,
                "columns": [
                    { "data": "nombre" },
                    { "data": "apellido" },
                    { "data": "email" },
                    { "data": "telefono" }
                ]
            } );
            */

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
