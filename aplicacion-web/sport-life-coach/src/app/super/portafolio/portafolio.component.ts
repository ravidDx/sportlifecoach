import { Component, OnInit } from '@angular/core';
/*INTERFACES */
import {Portafolio} from '../../interfaces/portafolio.interface';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
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
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PortafolioComponent implements OnInit {

  
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



  portafolioList: Portafolio[]=[];

  portafolio:Portafolio={
    titulo:'',
    subtitulo:'',
    detalle:'',
    imagen:''
  }

  constructor(private _onepageService:OnepageService,
              private toasterService:ToasterService,
               private _http: HttpClient,) { 

      this.getPortafolio();
    }

  ngOnInit() {
  }

   /*Obtener data de services*/
   getPortafolio(){
    this._onepageService.getPortafolio()
    .subscribe(
      data=>{
       
        for(let key$ in data){
          let portafolioNew = data[key$];
          portafolioNew['id']=key$;
          this.portafolioList.push(portafolioNew);            
        }
        console.log(this.portafolioList);
        
      },
      error=>{
        console.log(error);
      }

    );
      
  }


  editModal(portafolio:Portafolio){
    //this.clearForm();
    this.portafolio=portafolio;    
  }


  updatePortafolio(){
    var idPortafolio = this.portafolio['id'];
    delete this.portafolio['id'];
    var idImg = 'item.jpg';

    if(this.files.length!=0){
       //const idImg = Math.random().toString(36).substring(2);
       if(idPortafolio!=0){
        idImg ='item'+(parseInt(idPortafolio)+1)+'.jpg';
       }
 
        this._onepageService.onUploadPortafolio(this.files[0].data,idImg)      
        .subscribe(
          data=>{
            if(data.metadata!=null){
              this._onepageService.downloadPortafolioUrl(idImg).subscribe(
                data=>{
                   this.portafolio.imagen=data;
                   console.log(this.portafolio)
                   console.log(idPortafolio)
                   
                   this._onepageService.updatePortafolio(this.portafolio,idPortafolio)
                   .subscribe(
                     data=>{
                       console.log('Portafolio Actualizado')
                       this.closeModal();
                       this.clearForm();
                       this.Info("Portafolio editado OK !!");
                       console.log(data)
                     },
                     error=>{
                       console.log(error);
                     }
           
                   );
                       
                },
                error=>{
                  console.log(error);
                }
              );
            
            }
            
          },
          error=>{
  
            console.log(error);
          }

        );
        
    }else{      
      this._onepageService.updatePortafolio(this.portafolio,idPortafolio)
        .subscribe(
          data=>{
            console.log('updatePortafolioservice')
            this.closeModal();
            this.Info("Portafolio editado OK !!");
            console.log(data)
          },
          error=>{
            console.log(error);
          }

        );
    }


   
    
  }


  closeModal(){
    $('#dataModal').modal('hide');
  }

  clearForm(){
    this.files = [];
  }


  /*MENSAJES ALERTS*/
  Info(title:any){
    this.toasterService.Info(title);
  }

  



  /* ----------------- METODOS UPLOAD -------------------*/
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
