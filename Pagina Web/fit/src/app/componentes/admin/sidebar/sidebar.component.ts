import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var  $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	(function($) {
		$('[data-toggle="tooltip"]').tooltip()
  	})(jQuery);
  	
  }

}