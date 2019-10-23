
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

/*Interfaces */
import {Entrenamiento} from '../../interfaces/entrenamiento.interface';

/*sERVICIOS */
import {CategoriaService} from '../../services/categoria.service';
import {EntrenamientoService} from '../../services/entrenamiento.service';
import {ToasterService} from '../../services/toaster.service';


/*SERVICIOS FILE UPLOAD -------------------------------------------------------*/
import {Input, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {HttpClient,HttpRequest, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';
import {FileUploadModel} from '../../class/fileuploadmodel'
/*----------------------------------------------------------------------- */

declare var  $: any;

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class EjerciciosComponent implements OnInit {
 
  
  /* ...................... VARIABLES FILE UPLOAD ........................*/
  /** Link text */
  @Input() text = 'Cargar imagenes';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />. By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  /*................................................................*/

  btnSave:boolean = false;
  

  tiposEntrenamiento= []

  duracionList=['10 min','20 min','30 min','40 min','50 min','1 hora','1 h 15 min','1 h 30 min' ,'1 h 45 min']

  entrenamiento:Entrenamiento = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagenes:[],
    portada:'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg',
    series:'',
    repeticiones:'',
    duracion:''
  }

  entrenamientoEdit:Entrenamiento = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagenes:[],
    portada:'',
    series:'',
    repeticiones:'',
    duracion:''
  }

  entrenamientos:Entrenamiento[]=[];
  entrenamientosTodo:Entrenamiento[]=[];

  url:any;

  indiceDelete:any;
  load=false;
  eventData:any;
  loadTrash:any;
  trash:any;
  msgAlert:string;

  posicion:any;

  new:boolean = true;



  constructor(private _http: HttpClient,
              private _entrenamientoService:EntrenamientoService,
              private _categoriaService:CategoriaService,
              private _toasterService:ToasterService,
              private _router:Router) 
  { 
    this.listar();
    
  }

  ngOnInit() {
  }


  //Metodo para guardar y editar  datos
  guardar(){
    
    if(this.new==true){
      this.btnSave=true; 
      var _this = this;
      //cargar y guardar imagenes en firebase
      this.files.forEach( function(item, indice, array) {
        const id = Math.random().toString(36).substring(2);
        _this.entrenamiento.imagenes.push(id);
        _this._entrenamientoService.onUpload(item.data,id);      
        if(indice==0){
          _this.entrenamiento.portada = id;
        }
  
      });
  
      this.nuevoEntrenamiento();

    }else{

      if(this.files.length ==0){

        this.editarEntrenamiento();
        
      }else{

            var _this = this;
            this.entrenamientoEdit.imagenes = [];
          //cargar y guardar imagenes en firebase
          this.files.forEach( function(item, indice, array) {
            const id = Math.random().toString(36).substring(2);
            _this.entrenamientoEdit.imagenes.push(id);
            _this._entrenamientoService.onUpload(item.data,id);      
            if(indice==0){
              _this.entrenamientoEdit.portada = id;
            }
      
          });

          this.editarEntrenamiento();

        
      }


    }

  }


  //Metodo guardar entrenamiento
  nuevoEntrenamiento(){
    this._entrenamientoService.nuevoEntrenamiento(this.entrenamiento).subscribe(
      data=>{
        
        this._toasterService.Success('Entrenamiento guardado OK !!');
        this.files = [];
        this.btnSave=false;
        this.clearForm();
        this.closeModal();
        this.listar();
        

      },
      error=>{
        console.log('ERROR');
        this._toasterService.Error(' Error al guardar !!');
        console.log(error);
        this.btnSave=false;
      
      }

    );
  }


  //Metodo listar entrenamientos
  listar(){
    let _this = this;
    this._entrenamientoService.consultarEntrenamientos()
      .subscribe(
        data=>{

          data["entrenamientos"].forEach( function(item, indice, array) {

              _this._entrenamientoService.downloadUrl(item.portada).subscribe(
                data=>{
                  item.portada=data;         
                },
                error=>{
                  console.log('ERROR');
                  
                }
              );

              item.portada = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';

             
          });

          this.entrenamientos = data["entrenamientos"];
          this.entrenamientosTodo = data["entrenamientos"];
          console.log(this.entrenamientos)
           
          this.getCategoriasEntrenamiento();
          
        },
        error=>{
          console.log(error);
        }

      );

  }

  listar_por_tipo(tipo:any){
    
    if(tipo == 'todos'){
      this.entrenamientosTodo=this.entrenamientos;
      
    }else{

        var _this = this;
        this.entrenamientosTodo=[];
        this.entrenamientos.forEach( function(item, indice, array) {
          if(tipo == item.tipo){
            item['posicion']=indice;
          _this.entrenamientosTodo.push(item);
          
          }
    
        });

    }

   
  }


  getCategoriasEntrenamiento(){
    this.tiposEntrenamiento=[];
    this._categoriaService.getCategoriasEntrenamiento()
    .subscribe(
      data=>{
        for(let key$ in data){
          let catgNew = data[key$];
          catgNew['id']=key$;
          catgNew['longitud']=0;
          
          for(let pos in this.entrenamientosTodo){
            let obj = this.entrenamientosTodo[pos];
            if(obj['tipo'] == catgNew['nombre']  ){
              catgNew['longitud'] = catgNew['longitud'] + 1;
            }      
          }

        this.tiposEntrenamiento.push(catgNew); }
        
      },
      error=>{
        console.log(error);
      }

    );

  }


  selectTipo(tipo:any){
    this.listar_por_tipo(tipo);
  }

  cargarId(item:any, event:any, posicion:any){
    this.indiceDelete = item
    this.eventData = event;
    this.posicion = posicion;
  }

  eliminar(){
    this.loadingTrash();
    this._entrenamientoService.eliminarEntrenamiento(this.indiceDelete).subscribe(
      data=>{
       
        this._toasterService.Success("Ejercicio eliminado OK !!"); 
        this.loadTrash.hide();
        this.trash.show(); 
        this.listar();
      },
      error=>{
        console.log('ERROR');
        this._toasterService.Error("No se pudo eliminar correctamente !!");
        console.log(error);
        this.loadTrash.hide();
        this.trash.show();
      }
    );

   
  }


 

  editModal(entrenamiento:Entrenamiento){
    this.new=false;
    this.entrenamientoEdit=entrenamiento;
    
  }


  editarEntrenamiento(){
    
    this._entrenamientoService.editarEntrenamiento(this.entrenamientoEdit,this.entrenamientoEdit["_id"]).subscribe(
      data=>{
        console.log(data);
        this.closeModal();
        this._toasterService.Success("Entrenamiento editado OK !!");
        this.listar();
       // this.viewAlert("Deportista editado OK !!")
        //this.disabledButton(false);
      },
      error=>{
        console.log(error);
        this._toasterService.Error("No se pudo editar correctamente!!");
        //this.disabledButton(false);
      }
      
    );


  }

  newModal(){
    this.new = true;
  }
  

  calcularLongitud(){
    this.entrenamientos.forEach( function(item, indice, array) {
      
      this.tiposEntrenamiento.forEach( function(item2, indice, array) {
        if(item2.nombre == item.tipo){
          item2.longitud = item2.longitud + 1;
          return 0;
        }
      });


    });
  }


  loadingTrash(){
    //this.habilitar=false;
 
    this.trash = $(this.eventData.target).parent().find(`#${this.indiceDelete}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();
    
    this.trash.hide();
    this.loadTrash.show();
  }


  clearForm(){
    this.entrenamiento.tipo="";
    this.entrenamiento.titulo="";
    this.entrenamiento.objetivo="";
    this.entrenamiento.imagenes=[];
    this.entrenamiento.series="";
    this.entrenamiento.repeticiones="";
    this.entrenamiento.duracion='';
  }

  
  closeModal(){
    $('#dataModal').modal('hide');
  }



  select(event:any){
    this.entrenamiento.tipo=event;
    console.log(event);
  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    if (file) {
      if (file.sub) {
        file.sub.unsubscribe();
      }
      this.removeFileFromArray(file);
    }
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
  
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {
        
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        
        console.log('catch error');
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      
      (event: any) => {
        
        
        if (typeof (event) === 'object') {
          //console.log(this.files)
          
          //this.removeFileFromArray(file);
          //this.complete.emit(event.body);
        }
      }
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      if (!file.inProgress) {
        this.uploadFile(file);
      }
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    //console.log(this.files);
  }

  private uploadFiletoArray(){
      
    //this._entrenamientoService.onUpload(file.data);
  }

  getDownload(url:any, indice:any){

    let res;
  
    this._entrenamientoService.downloadUrl(url).subscribe(
      data=>{
        this.entrenamientos
        res= data;
        //console.log('-----------------------------');
       // console.log(res);

       
        //return res;
      },
      error=>{
        console.log('ERROR');
        console.log(error);
        res= 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
        //return res;
      }
  
    );

    return 'asd ';
  
   
  }


  

}







