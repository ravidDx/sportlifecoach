import { Component, OnInit } from '@angular/core';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
/*INTERFACES */
import {About} from '../../interfaces/about.interface';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    rol:string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', rol:'admin' },
    { path: '/deportista-list', title: 'Deportistas',  icon: 'format_list_bulleted', class: '',rol:'admin' },
    { path: '/ejercicios', title: 'Ejercicios',  icon: 'directions_run', class: '',rol:'admin' },
    { path: '/dietas', title: 'Dietas',  icon: 'restaurant_menu', class: '',rol:'admin' },
    { path: '/promociones', title: 'Promociones',  icon: 'local_offer', class: '',rol:'admin' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '',rol:'admin' },
    { path: '/inicio', title: 'Inicio',  icon:'home', class: '',rol:'super' },
    { path: '/about', title: 'About',  icon:'account_circle', class: '',rol:'super' },
    { path: '/services', title: 'Services',  icon:'favorite', class: '',rol:'super' },
    { path: '/portafolio', title: 'Portafolio',  icon:'work', class: '',rol:'super' },
    { path: '/posts', title: 'Posts',  icon:'note_add', class: '',rol:'super' },
    
    
    /*
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  rol:string;
  name:string;

  about:About={
    titulo:"",
    nombre:"",
    experiencia:"",
    servicios:"",
	  imagen:"",
  }
  

  constructor(private _onepageService:OnepageService) { 
   

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.rol=localStorage.getItem('rol');
    if(this.rol === 'admin'){
      this.name='Admin Fit';
      this.about.imagen="/assets/images/logo-black.png";
    }else{
      this.name='Super Admin'
      this.getAbouts();
    }

    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

    /*Obtener data de about*/
    getAbouts(){
      this._onepageService.getAbouts()
      .subscribe(
        data=>{
        
          this.about.imagen = data[0].imagen;
          
        },
        error=>{
          console.log(error);
        }
  
      );
        
    }



}
