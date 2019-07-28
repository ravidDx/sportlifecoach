import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription ,  of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

import {Dieta} from '../../interfaces/dieta.interface';
import {DietaService} from '../../services/dieta.service';



@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DietasComponent implements OnInit {

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


  tiposDieta= [
    {id:1, name:'bajo en calorias'},
    {id:2, name:'bajo en proteinas'},
    {id:3, name:'otros'}
  ]

  
  itemsIngredientes =[
    {id:1, value:''}
  ]

  itemsPreparacion =[
    {id:1, value:''}
  ]

  dieta:Dieta = {
    tipo:"",
    titulo:"",
    objetivo:"",
    ingredientes:[],
    preparacion:[],
    imagen:''
  }

  dietas:Dieta[]=[];

  constructor(private _http: HttpClient,
              private _dietaService:DietaService) 
  { 
    this.listar();
  }

  ngOnInit() {
  }


  guardar(){
    var _this = this;
    const id = Math.random().toString(36).substring(2);
    this.dieta.ingredientes = this.itemsIngredientes;
    this.dieta.preparacion = this.itemsPreparacion;
    _this._dietaService.onUpload(this.files[0].data,id);
    _this.dieta.imagen = id;
    console.log(this.dieta);

    this._dietaService.nuevaDieta(this.dieta).subscribe(
      data=>{
        console.log(data);
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
    console.log('listar');
    let _this = this;
    this._dietaService.consultarDietas()
      .subscribe(
        data=>{
          data["dietas"].forEach( function(item, indice, array) {
              _this._dietaService.downloadUrl(item.imagen).subscribe(
                data=>{
                  item.imagen=data;         
                },
                error=>{
                  console.log('ERROR');
                  console.log(error);
                }
              );

              item.imagen = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
           
          });

          this.dietas = data["dietas"];
          console.log(this.dietas)

        },
        error=>{
          console.log(error);
        }

      );
    }


    clearForm(){
      this.dieta.tipo="";
      this.dieta.titulo="";
      this.dieta.objetivo="";
      this.dieta.imagen = "";
      this.dieta.ingredientes=[];
      this.dieta.preparacion=[];
      this.itemsIngredientes=[];
      this.itemsPreparacion=[];
    }

  closeModal(){
    //$('#dataModal').modal('hide');
  }


  newModal(){
  }

  addIngrediente(){
    console.log(this.itemsIngredientes);
    let key = (this.itemsIngredientes.length)+1;
    this.itemsIngredientes.push({id:key, value:''});
  }
  
  addPreparacion(){
    console.log(this.itemsPreparacion);
    console.log(this.itemsIngredientes);
    let key = (this.itemsPreparacion.length)+1;
    this.itemsPreparacion.push({id:key, value:''});
  }

  deletedIngrediente(){
    this.itemsIngredientes.pop();
    
    console.log(this.itemsIngredientes);
  }

  deletedPreparacion(){
    this.itemsPreparacion.pop();
    console.log(this.itemsPreparacion);
  }

  select(event:any){
    this.dieta.tipo=event;
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
