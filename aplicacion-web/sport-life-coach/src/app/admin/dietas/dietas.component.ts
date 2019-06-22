import { Component, OnInit } from '@angular/core';
import {Dieta} from '../../interfaces/dieta.interface';
import {DietaService} from '../../services/dieta.service';


@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.scss']
})
export class DietasComponent implements OnInit {

  tiposDieta= [
    {id:1, name:'bajo en calorias'},
    {id:2, name:'bajo en proteinas'},
    {id:3, name:'otros'}
  ]

  dieta:Dieta = {
    tipo:"",
    titulo:"",
    objetivo:"",
    ingredientes:[],
    preparacion:[],
    portada:'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg'
  }

  constructor() { }

  ngOnInit() {
  }


  guardar(){}

  closeModal(){
    //$('#dataModal').modal('hide');
  }


  newModal(){
  }


}
