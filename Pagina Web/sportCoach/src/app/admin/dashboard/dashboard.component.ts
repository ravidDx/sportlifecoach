import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fullScreen:boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doFullScreen() {

    function launchIntoFullscreen(element) {

    }
    function exitFullscreen() {
        
    }


  }



  logout() {
        
   }




}
