import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatTable} from '@angular/material';

import { Subject } from 'rxjs/Subject';

import {Router} from '@angular/router';
import {NgForm} from '@angular/forms'; 

import {Deportista} from '../../interfaces/deportista.interface';
import {DeportistaService} from '../../services/deportista.service';
import {AuthService} from '../../services/auth.service';
import {ToasterService} from '../../services/toaster.service';

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

  displayedColumns: string[] = ['position','nombre', 'apellido', 'email', 'telefono', 'acciones'];
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

  tiposObjetivo:string[] = ['Perder peso y quemar grasa','Ganar masa muscular y fuerza', 'Vivir de forma saludable y mantener mi peso'];

  deportista:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:"",
    peso:"",
    altura:"",
    foto:"https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png",
    genero:"",
    objetivo:"",
    observaciones:"",
    rol:"user"
  }

  deportistaEdit:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:[],
    peso:"",
    altura:"",
    foto:"",
    genero:"",
    objetivo:"",
    observaciones:"",
    rol:""
  }

  deportistas:Deportista[] =[];

  favoriteSeason: string; 
 
  constructor(private _deportistaService:DeportistaService,
              private _router:Router, 
              public dialog: MatDialog,
              private changeDetectorRefs:ChangeDetectorRef,
              private toasterService:ToasterService,
              private _authService:AuthService) { 
    this.listar();
  }

  ngOnInit() {
    //"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
  }

  
  guardar(){
    console.log(this.deportista)

    if(this.new==true){
      this.disabledButton(true);

      this._deportistaService.nuevoDeportista(this.deportista).subscribe(
        data=>{
          console.log(data['deportista'])
          //Guardar credenciales email y pass en firebase
          this.guardarAuthUser(this.deportista.email,this.deportista.email);       
          
          this.dataSource.data = this.dataSource.data.concat(data['deportista']);
          this.clearForm();
          this.closeModal();
          this.Success("Deportista guardado OK !!");
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
          this.Info("Deportista editado OK !!");
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

  guardarAuthUser(email:any, pass:any){
    this._authService.signUpWithEmail(email,pass)
    .then(data=>{
      console.log('succes: '+data.user)
    })
    .catch(err=>{
      console.log('error: '+err)
    })
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

    this.loadingTrash();
       
    this._deportistaService.eliminarDeportista(this.indiceData).
  		subscribe(
  			data=>{
       
        this.refresh();
        this.Error("Deportista eliminado OK !!");
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
    this.deportista.genero="";
    this.deportista.objetivo="";
    this.deportista.observaciones="";
  }

  select(event:any){
    console.log(event)
    //this.deportista.objetivo=event;
 
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

  Success(title:any){
    this.toasterService.Success(title);
  }
  Info(title:any){
    this.toasterService.Info(title);
  }
  Warning(title:any){
    this.toasterService.Warning(title);
  }
  Error(title:any){
    this.toasterService.Error(title);
  }


  

 
}
