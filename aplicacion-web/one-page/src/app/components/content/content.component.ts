import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../services/service.service';

/*INTERFACES */
import {Service} from '../../models/service';
import {Portafolio} from '../../models/portafolio.interface';

import { element } from '@angular/core/src/render3';
//import { url } from 'inspector';

declare var  $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  slider1 = 'url(../../../assets/img/slider/01.jpg)';
  slider2 = 'url(../../../assets/img/slider/02.jpg)';
  slider3 = 'url(../../../assets/img/slider/03.jpg)';


  /*SERVICIOS*/
  serviciosDelay =['0.0s','0.3s','0.6s','0.9s'];
  serviciosIcon= ['face','directions_run','fitness_center','favorite'];
  servicioSubt='Servicio de entrenamiento integral dirigido a que logres romper hábitos que te impiden alcanzar tu mejor versión.';
  
  /*Portafolio*/
  portafolioSub = 'Sea cual sea tú objetivo estarás mas cerca de lograrlo si comienzas hoy a trabajar por ello! Comenzar es el primer paso, mantenerte disciplinado y enfocado marca la diferencia.';

  serviciosList = [
    {
      titulo:'',
      detalle:'',
      delay:'',
      icon:''
    },
    {
      titulo:'',
      detalle:'',
      delay:'',
      icon:''
    },
    {
      titulo:'',
      detalle:'',
      delay:'',
      icon:''
    },{
      titulo:'',
      detalle:'',
      delay:'',
      icon:''
    }
  ];


  sliderList = [
    {
      titulo:'',
      imagen:''
    },
    {
      titulo:'',
      imagen:''
    },
    {
      titulo:'',
      imagen:''
    }
  ];

  about = {
      nombre:'',
      experiencia:'',
      servicios:'',
      imagen:''
  };

  portafolioList: Portafolio[] =  [
    {
      titulo:'',
      subtitulo:'',
      detalle:'',
      imagen:''
    },
    {
      titulo:'',
      subtitulo:'',
      detalle:'',
      imagen:''
    },
    {
      titulo:'',
      subtitulo:'',
      detalle:'',
      imagen:''
    },
    {
      titulo:'',
      subtitulo:'',
      detalle:'',
      imagen:''
    },
    {
      titulo:'',
      subtitulo:'',
      detalle:'',
      imagen:''
    },
    {
      titulo:'',
      subtitulo:'',
      detalle:'',
      imagen:''
    }
  ];


  noticias=[];

  list: any[] = [] ;

  constructor(private _serviceService:ServiceService) { 
    this.getSliders();
    this.getServices();
    this.getAbout();
    this.getNoticias();
    this.getPortafolio();
    
  }



  ngOnInit() {



  }


  applySlider1(){
    
    const styles = {'background-image': "url('"+this.sliderList[0].imagen+"')"}
   
    return styles;
  }
  applySlider2(){
    const styles = {'background-image':"url('"+this.sliderList[1].imagen+"')"}
    return styles;
  }
  applySlider3(){
    const styles = {'background-image':"url('"+this.sliderList[2].imagen+"')"}
    return styles;
  }

  applyParallax(){
    const styles = {'background-image':this.slider1}
    return styles;
  }



  getServices(){
    
    this._serviceService.getServices()
      .snapshotChanges()
      .subscribe(item =>{
       
        item.forEach(element =>
        {
          let data = element.payload.toJSON();
          this.serviciosList[element.key].titulo=data['titulo'];
          this.serviciosList[element.key].detalle=data['detalle']; 
          this.serviciosList[element.key].delay=this.serviciosDelay[element.key];
          this.serviciosList[element.key].icon=this.serviciosIcon[element.key];
        
        });
        
        console.log( this.serviciosList);
        
      })
  }


  getAbout(){
    
    this._serviceService.getAbout()
      .snapshotChanges()
      .subscribe(item =>{
        item.forEach(element =>
        {
          let data = element.payload.toJSON();
          this.about.nombre=data['nombre'];
          this.about.experiencia=data['experiencia'];
          this.about.servicios=data['servicios'];
          this.about.imagen=data['imagen'];
     
                           
        });
          
      })

    
  }


  getNoticias(){
    
    this._serviceService.getNoticias()
      .snapshotChanges()
      .subscribe(item =>{
        item.forEach(element =>
        {
          let data = element.payload.toJSON();
          //console.log(data['detalle']);
          this.noticias[element.key]=data['detalle'];
                           
        });
          
      })

      console.log(this.noticias)
  }


  getSliders(){
    this._serviceService.getSliders()
    .subscribe(
      data=>{
        for(let key$ in data){
          let sliderNew = data[key$];
          sliderNew['id']=key$;
          this.list.push(sliderNew);
          this.sliderList[key$]=sliderNew;
        }

        console.log(this.list)
   
      },
      error=>{
        console.log(error);
      }

    );
      
  }


  getPortafolio(){
    this._serviceService.getPortafolio()
    .subscribe(
      data=>{
        for(let key$ in data){
          let portafolioNew = data[key$];
          portafolioNew['id']=key$;
          this.portafolioList[key$]= portafolioNew;
        }

        console.log(this.portafolioList)
   
      },
      error=>{
        console.log(error);
      }

    );

      console.log(this.noticias)
  }



}
