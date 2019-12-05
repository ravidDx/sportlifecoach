import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

   email:string = '';

  constructor() {
    this.email = localStorage.getItem('email');
    console.log(localStorage)
    console.log(this.email);
   }

  ngOnInit() {
  }


 
}
