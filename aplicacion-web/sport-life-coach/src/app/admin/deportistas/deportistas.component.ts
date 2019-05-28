import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatTable} from '@angular/material';

import { Subject } from 'rxjs/Subject';

import {Router} from '@angular/router';
import {NgForm} from '@angular/forms'; 

import {Deportista} from '../../interfaces/deportista.interface';
import {DeportistaService} from '../../services/deportista.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

declare var  $: any;

@Component({
  selector: 'app-deportistas',
  templateUrl: './deportistas.component.html',
  styleUrls: ['./deportistas.component.scss']
})
export class DeportistasComponent implements OnInit {
  
  //Datatable
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTable') myTable: MatTable<any>;

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Deportista>();
  
  habilitar:boolean=true;
  new:boolean;
  cargar:boolean=false;
  load=false;
  loadTrash:any;
  trash:any;
  msgAlert:string;
  btnDisabled = false;
  
  indiceData:any;
  eventData:any; 

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

  deportistas:Deportista[] =[];
 
  constructor(private _deportistaService:DeportistaService,
              private _router:Router, 
              public dialog: MatDialog,
              private changeDetectorRefs:ChangeDetectorRef) 
  { 
    this.listar();
  }

  ngOnInit() {
    //"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
  }

  
  guardar(){
    
    if(this.new==true){
      this.disabledButton(true);

      this._deportistaService.nuevoDeportista(this.deportista).subscribe(
        data=>{
          console.log(data['deportista'])
          this.dataSource.data = this.dataSource.data.concat(data['deportista']);
          this.clearForm();
          this.closeModal();
          //this.viewAlert("Deportista guardado OK !!")
          this.disabledButton(false);

        },
        error=>{
          console.log('ERROR');
          console.log(error);
          this.disabledBtn(false);
          this.loading(false);
        }
  
      );
      

    }else if(this.new==false){
      this.disabledButton(true);
      this._deportistaService.editarDeportista(this.deportistaEdit,this.deportistaEdit["_id"]).subscribe(
        data=>{
          console.log(data);
          this.closeModal();
         // this.viewAlert("Deportista editado OK !!")
          this.disabledButton(false);
        },
        error=>{
          console.log(error);
          this.disabledButton(false);
        }
        
      );
      
    }
    
  }

  listar(){
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data=>{
          this.deportistas = data["deportistas"];
          this.dataSource.data =this.deportistas;
          this.dataSource.paginator = this.paginator;
          console.log(this.deportistas);        
        },
        error=>{
          console.log(error);
        }

      );

  }
  
  cargarId(indice:string, event:any){
    this.indiceData=indice;
    this.eventData = event;
    console.log(this.indiceData);
  }

  eliminar(){
    //console.log('eliminar'); 
    //console.log(this.indiceData);
    this.loadingTrash();
       
    this._deportistaService.eliminarDeportista(this.indiceData).
  		subscribe(
  			data=>{
       // console.log("Se elimino");
       // console.log(data);
        this.refresh();
        //this.viewAlert("Deportista eliminado OK !!")
        this.loadTrash.hide();
        this.trash.show();       
  			},
  			error=>{
          console.log(error);
          this.loadTrash.hide();
          this.trash.show();
  			}

    );

  }

  mostrar(indice:string){
    //this._router.navigate(['/dashboard/perfil', indice]);
  }



  editModal(deportista:Deportista){
    
    this.new=false;
    this.deportistaEdit=deportista;
    this.deportistaEdit.fechaN=new Date( (this.deportistaEdit.fechaN)[0] );
    
    console.log(this.deportistaEdit);
   
    //console.log(this.deportistaEdit);
    /*this.deportistaEdit.fechaN = deportista.fechaN['0'];
    */
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



  viewAlert(msg:string){
    this.msgAlert = msg;
    $('.alert').fadeIn(1500);
    $('.alert').fadeOut(2500);
  }

  closeModal(){
    $('#dataModal').modal('hide');
  }

  disabledBtn(access:boolean){
    this.btnDisabled = access;
  }

  loading(load:boolean){
    this.load = load;
  }

  loadingTrash(){
    console.log($(this.eventData));
    console.log($(this.eventData.target));
    //this.habilitar=false;
 
    this.trash = $(this.eventData.target).parent().find(`#${this.indiceData}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();
    
    this.trash.hide();
    this.loadTrash.show();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {nombre: this.deportista.nombre, apellido: this.deportista.apellido}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deportista.apellido = result;
    });
  }

  refresh(){
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i]['_id']  == this.indiceData ) {
        console.log(this.dataSource.data[i] );
        console.log(i);
        this.dataSource.data.splice(i, 1);
        this.dataSource.data = this.dataSource.data.slice();
        break;
      }  
    }

  }

  disabledButton(valor:boolean){
    this.disabledBtn(valor);
    this.loading(valor);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  

 
}
