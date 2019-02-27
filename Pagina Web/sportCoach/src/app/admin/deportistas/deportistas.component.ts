import { Component, OnInit,ViewChild } from '@angular/core';

declare var  $: any;



@Component({
  selector: 'app-deportistas',
  templateUrl: './deportistas.component.html',
  styleUrls: ['./deportistas.component.css']
})
export class DeportistasComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;


  closeResult: string;

  constructor() { }

  ngOnInit() {
  	  //DataTable
  	this.dataTable = $(this.table.nativeElement);
  	//this.dataTable.dataTable();
    this.dataTable= $('#data').DataTable({ "language": {"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"}});



  }




}
