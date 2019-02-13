import { Component, OnInit, ViewChild } from '@angular/core';
declare var  $: any;

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;

  constructor() { }

  ngOnInit() {

  	this.dataTable = $(this.table.nativeElement);
  	this.dataTable.dataTable();

  	
  }

}
