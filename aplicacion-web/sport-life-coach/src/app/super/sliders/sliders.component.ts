import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/*INTERFACES */
import {Slider} from '../../interfaces/slider.interface';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
import {ToasterService} from '../../services/toaster.service';

/*SERVICIOS FILE UPLOAD -------------------------------------------------------*/
import {trigger, state, style, animate, transition} from '@angular/animations';
import {HttpClient,HttpRequest, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';
import {FileUploadModel} from '../../class/fileuploadmodel'
/*----------------------------------------------------------------------- */


declare var  $: any;

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SlidersComponent implements OnInit {

  /* ...................... VARIABLES FILE UPLOAD ........................*/
  /** Link text */
  @Input() text = 'Actualizar imagen';
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
  new:boolean;
  btnUpdate:boolean = false;
  slider:Slider={
    imagen:'',
    titulo:'',
    detalle:''
  }

  sliderList: Slider[] = [] ;
  

  constructor(private _onepageService:OnepageService, private _http: HttpClient, private _toasterService:ToasterService) { 
    this.getSliders();
  }

  ngOnInit() {
  }

  
  getSliders(){
    this._onepageService.getSliders()
    .subscribe(
      data=>{
        console.log('Success');
        for(let key$ in data){
          let sliderNew = data[key$];
          sliderNew['id']=key$;
          this.sliderList.push(sliderNew);            
        }
      },
      error=>{
        console.log(error);
      }

    );
      
  }


  editModal(slider:Slider){
    this.clearForm();
    this.slider=slider;    
  }

  updateSlider(){
    this.btnUpdate=true;
    var idSlider = this.slider['id'];
    //delete this.slider['id'];
    if(this.files.length!=0){
       const idImg = Math.random().toString(36).substring(2);
        this._onepageService.onUpload(this.files[0].data,idImg)      
        .subscribe(
          data=>{
            if(data.metadata!=null){
              this._onepageService.downloadUrl(idImg).subscribe(
                data=>{
                   this.slider.imagen=data;
                   this._onepageService.updateSilder(this.slider,idSlider)
                   .subscribe(
                     data=>{
                       this._toasterService.Success('Slider actualizado OK !!');
                       this.closeModal();
                       this.btnUpdate=false;
                     },
                     error=>{
                       console.log(error);
                       this._toasterService.Error('Error al actualizar !!');
                       this.btnUpdate=false;
                     }
           
                   );
                       
                },
                error=>{
                  console.log(error);
                  this.btnUpdate=false;
                  this._toasterService.Error('Error al actualizar !!');
                }
              );
            
            }
    
            
          },
          error=>{
            console.log(error);
            this.btnUpdate=false;
            this._toasterService.Error('Error al actualizar !!');
          }

        );
        
    }else{      
      this._onepageService.updateSilder(this.slider,idSlider)
        .subscribe(
          data=>{
            this._toasterService.Success('Slider actualizado OK !!');
            this.closeModal();
            this.btnUpdate=false;
          },
          error=>{
            this.btnUpdate=false;
            this._toasterService.Error('Error al actualizar !!');
            console.log(error);
          }

        );
    }


   
    
  }

  closeModal(){
    $('#dataModal').modal('hide');
  }

  newModal(){
  }

  clearForm(){
    this.slider={
      imagen:'',
      titulo:'',
      detalle:''
    }
    this.files = [];
    
  }

  

  /* ----------------- METODOS UPLOAD -------------------*/
  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log(file);
        this.files.push({ data: file, state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true });
        console.log(this.files);
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



}



