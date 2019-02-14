import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

declare var  $: any;
declare var jQuery: any;

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;
  model;

  constructor() { }

  ngOnInit() {

    //DataTable
  	this.dataTable = $(this.table.nativeElement);
  	//this.dataTable.dataTable();
    this.dataTable= $('#data').DataTable({ "language": {"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"}});

  
  }

}
