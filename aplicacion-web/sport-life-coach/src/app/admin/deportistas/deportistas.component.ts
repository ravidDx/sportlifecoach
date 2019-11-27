import { Component, OnInit, ViewChild, ChangeDetectorRef, NgModule } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

<<<<<<< HEAD
import { Deportista } from '../../interfaces/deportista.interface';
import { DeportistaService } from '../../services/deportista.service';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';
=======
import {Deportista} from '../../interfaces/deportista.interface';
import {Evaluacion} from '../../interfaces/evaluacion.interface';

import {DeportistaService} from '../../services/deportista.service';
import {EvaluacionService} from '../../services/evaluacion.service';
import {AuthService} from '../../services/auth.service';


import {ToasterService} from '../../services/toaster.service';
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';
import { Title } from '@angular/platform-browser';

import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

declare var $: any;

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

<<<<<<< HEAD
  displayedColumns: string[] = ['position', 'nombre', 'apellido', 'email', 'telefono', 'acciones'];
=======
  titleConfirm='';

  displayedColumns: string[] = ['position','nombre','apellido', 'email', 'telefono', 'estado', 'acciones'];
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
  dataSource = new MatTableDataSource<Deportista>();

  habilitar: boolean = true;
  new: boolean;
  cargar: boolean = false;
  load = false;
  loadTrash: any;
  trash: any;
  msgAlert: string;
  btnDisabled = false;
<<<<<<< HEAD

  indiceData: any;
  eventData: any;

  tiposObjetivo: string[] = ['Perder peso y quemar grasa', 'Ganar masa muscular y fuerza', 'Vivir de forma saludable y mantener mi peso'];

  deportista: Deportista = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaN: "",
    peso: "",
    altura: "",
    foto: "https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png",
    genero: "",
    objetivo: "",
    observaciones: "",
    rol: "user"
  }

  deportistaEdit: Deportista = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaN: [],
    peso: "",
    altura: "",
    foto: "",
    genero: "",
    objetivo: "",
    observaciones: "",
    rol: ""
=======
  
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
    foto:"",
    genero:"",
    objetivo:"",
    observaciones:"",
    rol:"",
    fechaCreacion:{},
    estado:"",
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
    rol:"",
    fechaCreacion:{},
    estado:"",
  }

  evaluacion:Evaluacion = {
    idDeportista:'',
    edad:'',
	  imc:'',
    fechaCreacion:{},
    recomendacion:'',
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
  }
  

  deportistas: Deportista[] = [];

  favoriteSeason: string;

<<<<<<< HEAD
  minDate = new Date(1920, 0, 1);
  maxDate = new Date(2001, 0, 1);

  myForm: FormGroup;

  constructor(private _deportistaService: DeportistaService, public fb: FormBuilder, 
    private _router: Router,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private toasterService: ToasterService,
    private _authService: AuthService) {
=======
  favoriteSeason: string; 
 
  constructor(private _deportistaService:DeportistaService,
              private _evaluacionService:EvaluacionService,
              public dialog: MatDialog,
              private toasterService:ToasterService,
              private _authService:AuthService) { 
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
    this.listar();
    this.deportista.fechaCreacion=this.getFechaActual();
   
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.myForm.value)
  }

  ngOnInit() {
    //"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
<<<<<<< HEAD
    this.reactiveForm();
  }


  guardar() {
    console.log(this.deportista)
=======
    //this.getFechaActual();
  }

  
  guardar(){
  
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a

    if (this.new == true) {
      this.disabledButton(true);

      this.deportista.foto = 'https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png'
      this.deportista.estado = 'Activo';
      this.deportista.rol = 'Afiliado',

      this._deportistaService.nuevoDeportista(this.deportista).subscribe(
<<<<<<< HEAD
        data => {
          console.log(data['deportista'])
          //Guardar credenciales email y pass en firebase
          this.guardarAuthUser(this.deportista.email, this.deportista.email);

          this.dataSource.data = this.dataSource.data.concat(data['deportista']);
=======
        data=>{
          
          var obj = Object.assign({},this.deportista);
          obj['_id']=data['name'];

          //Guardar credenciales email y pass en firebase
          this.guardarAuthUser(obj.email,obj.email);    
  
          this.dataSource.data = this.dataSource.data.concat(obj);
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
          this.clearForm();
          this.closeModal();
          this.toasterService.Success("Deportista guardado OK !!");
          //this.viewAlert("Deportista guardado OK !!")
          this.disabledButton(false);
          this.guardarEvaluacion(obj);      

        },
        error => {
          console.log('ERROR');
          console.log(error);
          this.disabledBtn(false);
          this.loading(false);
        }

      );


    } else if (this.new == false) {
      this.disabledButton(true);

      this._deportistaService.editarDeportista(this.deportistaEdit, this.deportistaEdit["_id"]).subscribe(
        data => {
          console.log(data);
         // this.refresh(this.deportistaEdit)
         this.listar();
          this.closeModal();
<<<<<<< HEAD
          this.Info("Deportista editado OK !!");
          // this.viewAlert("Deportista editado OK !!")
=======
          this.Success("Deportista editado OK !!");
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
          this.disabledButton(false);
          
        },
        error => {
          console.log(error);
          this.disabledButton(false);
        }

      );

    }

  }

<<<<<<< HEAD
  guardarAuthUser(email: any, pass: any) {
    this._authService.signUpWithEmail(email, pass)
      .then(data => {
        console.log('succes: ' + data.user)
      })
      .catch(err => {
        console.log('error: ' + err)
      })
  }

  listar() {
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data => {
          this.deportistas = data["deportistas"];
          this.dataSource.data = this.deportistas;
          this.dataSource.paginator = this.paginator;
          console.log(this.deportistas);
=======
  guardarAuthUser(email:any, pass:any){
    this._authService.signUpWithEmail(email,pass)
    .then(data=>{
      console.log(data)
    })
    .catch(err=>{
      console.log('error: '+err)
    })
  }

  guardarEvaluacion(obj:any){

    this.evaluacion.edad = this.calcularEdad(obj['fechaN']).toString();
    this.evaluacion.imc = this.calcularIMC(obj['peso'], obj['altura']).toString();
    this.evaluacion.idDeportista = obj['_id'];
    this.evaluacion.fechaCreacion=obj['fechaCreacion'];

    this._evaluacionService.nuevaEvaluacion(this.evaluacion).subscribe(
      data=>{
        console.log(data);
       // this.refresh(this.deportistaEdit)
      },
      error=>{
        console.log(error);
        this.disabledButton(false);
      }
      
    );

    console.log(this.evaluacion)

  }

  listar(){
    this.deportistas=[];
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data=>{

          for(let key$ in data){
	  				let deportista = data[key$];
	  				deportista['_id']=key$;
	  				this.deportistas.push(deportista);
          }
        
          this.dataSource.data = this.deportistas;
          this.dataSource.paginator = this.paginator;

          console.log(this.dataSource.data)
                 
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
        },
        error => {
          console.log(error);
        }

      );

  }

  cargarId(indice: string, event: any) {
    this.indiceData = indice;
    this.eventData = event;
    console.log(this.indiceData);
    
    
  }

  cargarObjectBaja(deportista:Deportista, event:any){
    this.indiceData=deportista["_id"];
    this.deportistaEdit = Object.assign({},deportista);
    this.eventData = event;

    if(deportista['estado'] == 'Activo' ){
      this.titleConfirm='Esta seguro de dar de baja a este deportista?';
  
    }else{
      this.titleConfirm='Esta seguro de dar de alta a este deportista?';
  
    }
    
  }

  eliminar() {

    this.loadingTrash();

    this._deportistaService.eliminarDeportista(this.indiceData).
<<<<<<< HEAD
      subscribe(
        data => {

          this.refresh();
          this.Error("Deportista eliminado OK !!");
          //this.viewAlert("Deportista eliminado OK !!")
          this.loadTrash.hide();
          this.trash.show();
        },
        error => {
=======
  		subscribe(
  			data=>{
       
        //this.refresh();
        this.Error("Deportista eliminado OK !!");
        //this.viewAlert("Deportista eliminado OK !!")
        this.loadTrash.hide();
        this.trash.show();       
  			},
  			error=>{
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
          console.log(error);
          this.loadTrash.hide();
          this.trash.show();
        }

      );

  }

<<<<<<< HEAD
  mostrar(indice: string) {
    //this._router.navigate(['/dashboard/perfil', indice]);
  }
=======
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a

  darBaja(){
    
    this.loadingTrash();
    let title="";

    if(this.deportistaEdit.estado == 'Activo'){
      this.deportistaEdit.estado = 'Inactivo';
      title = 'Deportista dado de baja OK !!';
    }else{
      this.deportistaEdit.estado = 'Activo';
      title = 'Deportista dado de alta OK !!';
    }
    
    this._deportistaService.darBajaDeportista(this.deportistaEdit,this.deportistaEdit["_id"]).subscribe(
      data=>{
        //this.refresh(this.deportistaEdit);
        this.listar();
        this.Success(title);
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


<<<<<<< HEAD
  editModal(deportista: Deportista) {

    this.new = false;
    this.deportistaEdit = deportista;

=======
  editModal(deportista:Deportista){
    
    this.new=false;
    this.deportistaEdit = Object.assign({},deportista);
    
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
  }

  newModal() {
    this.new = true;
  }


<<<<<<< HEAD
  clearForm() {
    this.deportista.nombre = "";
    this.deportista.apellido = "";
    this.deportista.email = "";
    this.deportista.telefono = "";
    this.deportista.fechaN = "";
    this.deportista.peso = "";
    this.deportista.altura = "";
    this.deportista.genero = "";
    this.deportista.objetivo = "";
    this.deportista.observaciones = "";
=======
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
    this.deportista.estado="";
    this.deportista.rol="";
    this.deportista.foto="";
    this.deportista.fechaCreacion=this.getFechaActual();
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
  }

  select(event: any) {
    console.log(event)
    //this.deportista.objetivo=event;

  }


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

  addZero(i:any){
     if (i < 10) {
        i = '0' + i;
    }
    return i;
    
  }

  



  viewAlert(msg: string) {
    this.msgAlert = msg;
    $('.alert').fadeIn(1500);
    $('.alert').fadeOut(2500);
  }

  closeModal() {
    $('#dataModal').modal('hide');
  }

  disabledBtn(access: boolean) {
    this.btnDisabled = access;
  }

  loading(load: boolean) {
    this.load = load;
  }

<<<<<<< HEAD
  loadingTrash() {
    console.log($(this.eventData));
    console.log($(this.eventData.target));
    //this.habilitar=false;

=======
  loadingTrash(){
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a
    this.trash = $(this.eventData.target).parent().find(`#${this.indiceData}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();

    this.trash.hide();
    this.loadTrash.show();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { nombre: this.deportista.nombre, apellido: this.deportista.apellido }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deportista.apellido = result;
    });
  }

<<<<<<< HEAD
  refresh() {
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i]['_id'] == this.indiceData) {
        console.log(this.dataSource.data[i]);
        console.log(i);
        this.dataSource.data.splice(i, 1);
        this.dataSource.data = this.dataSource.data.slice();
        break;
      }
    }
=======
  refresh(deportista:Deportista){ 
    let obj = Object.assign({},deportista);
>>>>>>> 4174e0b93d3766e9addb3deb95ac1c136a91e61a

     for(let pos in this.deportistas){
       if(this.deportistas[pos]['_id']== obj['_id']){
        this.deportistas[pos] = obj;
        console.log( this.deportistas[pos] )
       }
      
    }
    
  }

  disabledButton(valor: boolean) {
    this.disabledBtn(valor);
    this.loading(valor);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Success(title: any) {
    this.toasterService.Success(title);
  }
  Info(title: any) {
    this.toasterService.Info(title);
  }
  Warning(title: any) {
    this.toasterService.Warning(title);
  }
  Error(title: any) {
    this.toasterService.Error(title);
  }

  calcularEdad(FechaNacimiento:any) {
             
    var fechaNace:any = new Date(FechaNacimiento);
    var fechaActual:any = new Date()

    var mes = fechaActual.getMonth()+1;
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    var edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    return edad;
        
  }

  calcularIMC(peso:any, altura:any){
    let imc:any;
    peso = parseFloat(peso);
    altura = parseFloat(altura);
    altura = altura/100;
    imc = peso/(altura*altura)
    imc =  imc.toFixed(2);
    return imc;
  }






}
