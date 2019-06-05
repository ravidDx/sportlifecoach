
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription ,  of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

import {Entrenamiento} from '../../interfaces/entrenamiento.interface';
import {EntrenamientoService} from '../../services/entrenamiento.service';

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

  new:boolean;
  /** Link text */
  @Input() text = 'Cargar imagen';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />. By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  tiposEntrenamiento= [
    {id:1, name:'perder peso'},
    {id:2, name:'rehabilitacion'},
    {id:3, name:'musculacion y fuerza'},
    {id:4, name:'otros'}
  ]


  entrenamiento:Entrenamiento = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagenes:[],
    portada:'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg'
  }

  entrenamientos:Entrenamiento[]=[];


  url:any;


  constructor(private _http: HttpClient,
              private _entrenamientoService:EntrenamientoService) 
  { 
    this.listar();
  }

  ngOnInit() {
  }



  guardar(){
    
    var _this = this;

    //cargar y guardar imagenes en firebase
    console.log(this.entrenamiento.imagenes);
    this.files.forEach( function(item, indice, array) {
      const id = Math.random().toString(36).substring(2);
      _this.entrenamiento.imagenes.push(id);
      _this._entrenamientoService.onUpload(item.data,id);
      if(indice==0){
        _this.entrenamiento.portada = id;
      }
    });

    console.log(this.entrenamiento);
    console.log('listo');

    this._entrenamientoService.nuevoEntrenamiento(this.entrenamiento).subscribe(
      data=>{
  
        this.clearForm();
        this.closeModal();
        this.listar();
        this.files = [];

      },
      error=>{
        console.log('ERROR');
        console.log(error);
      
      }

    );

  }


  listar(){
    let _this = this;
    this._entrenamientoService.consultarEntrenamientos()
      .subscribe(
        data=>{
          data["entrenamientos"].forEach( function(item, indice, array) {
            console.log(item.portada)

             item.portada = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
            console.log(item.portada)
          });
          this.entrenamientos = data["entrenamientos"];
         

          //this.dataSource.data = this.deportistas;
          //this.dataSource.paginator = this.paginator;

        },
        error=>{
          console.log(error);
        }

      );

  }


    getDownload(url:any){

    var res;

    this._entrenamientoService.downloadUrl(url).subscribe(
      data=>{
        
        res= data;
      },
      error=>{
        console.log('ERROR');
        console.log(error);
        res= 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
      }

    );

    console.log(res);

    return res;


   
  }


  clearForm(){
    this.entrenamiento.tipo="";
    this.entrenamiento.titulo="";
    this.entrenamiento.objetivo="";
    this.entrenamiento.imagenes=[];
  }

  closeModal(){
    $('#dataModal').modal('hide');
  }


  newModal(){
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
        console.log("map");
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
        
        console.log(event);
        if (typeof (event) === 'object') {
          console.log(this.files)
          
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
    console.log(this.files);
  }

  private uploadFiletoArray(){
      
    //this._entrenamientoService.onUpload(file.data);
  }


  

}


export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}


