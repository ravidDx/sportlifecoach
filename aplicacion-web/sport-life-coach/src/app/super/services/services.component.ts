import { Component, OnInit } from '@angular/core';
/*INTERFACES */
import {Service} from '../../interfaces/service.interface';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
import {ToasterService} from '../../services/toaster.service';


declare var  $: any;



@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  
  serviciosIcon= ['face','directions_run','fitness_center','favorite'];

  servicesList: Service[]=[];

  service:Service={
    titulo:"",
    detalle:"",
  }

  constructor(private _onepageService:OnepageService,
              private toasterService:ToasterService) { 

                this.getServices();
              }

  ngOnInit() {
  }

  /*Obtener data de services*/
  getServices(){
    this._onepageService.getServices()
    .subscribe(
      data=>{
        console.log(data);
        for(let key$ in data){
          let serviceNew = data[key$];
          serviceNew['id']=key$;
          this.servicesList.push(serviceNew);            
        }
        
      },
      error=>{
        console.log(error);
      }

    );
      
  }


  editModal(service:Service){
    //this.clearForm();
    this.service=service;    
  }

  updateService(){
    var idService = this.service['id'];
    delete this.service['id'];
    console.log(this.service);
   
    this._onepageService.updateService(this.service,idService)
        .subscribe(
          data=>{
            console.log(data);
            this.closeModal();
            this.Info("Servicio editado OK !!");
          },
          error=>{
            console.log(error);
          }

        );

  }


  closeModal(){
    $('#dataModal').modal('hide');
  }

  clearForm(){
    this.service.detalle="";
    this.service.titulo="";
  }


  /*MENSAJES ALERTS*/
  Info(title:any){
    this.toasterService.Info(title);
  }

  



}
