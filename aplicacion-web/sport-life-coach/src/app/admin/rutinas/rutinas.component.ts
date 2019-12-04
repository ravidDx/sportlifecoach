import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';


/*Interfaces */
import { Rutina } from '../../interfaces/rutina.interface';
import { Entrenamiento } from '../../interfaces/entrenamiento.interface';

/*sERVICIOS */
import { EntrenamientoService } from '../../services/entrenamiento.service';
import { ToasterService } from '../../services/toaster.service';
import { RutinaService } from '../../services/rutina.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})
export class RutinasComponent implements OnInit {

  //Datatable
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTable') myTable: MatTable<any>;

  titleConfirm = '';

  displayedColumns: string[] = ['position', 'titulo', 'numEjers', 'duracion', 'dificultad', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Rutina>();


  new: boolean = true;
  duracionList = ['10 min', '20 min', '30 min', '40 min', '50 min', '1 hora', '1 h 15 min', '1 h 30 min', '1 h 45 min']
  descansoList = ["10´´", "20´´", "30´´", "40´´", "50´´", "60´´"]
  dificultadList: any = ['Principiante', 'Medio', 'Avanzado'];

  rutina: Rutina = {
    titulo: "",
    objetivo: "",
    ejercicios: [],
    duracion: "",
    dificultad: '',
    fechaCreacion: {},
    estado: '',
  }



  rutinaEdit: Rutina = {
    titulo: "",
    objetivo: "",
    ejercicios: [],
    duracion: "",
    dificultad: '',
    fechaCreacion: {},
    estado: '',
  }

  indiceData:any;
  eventData:any; 
  loadTrash:any;
  trash:any;

  entrenamientos: Entrenamiento[] = [];
  rutinas: Rutina[] = [];

  listaEjercicios: any[] = [];
  listaEjerciciosEdit: any[] = [];
  listEjerRutina: any[] = [];

  listEjerRutinaEdit: any[] = [];


  constructor(private _entrenamientoService: EntrenamientoService,
    private _rutinaService: RutinaService,
    private _toasterService: ToasterService) {
    this.listarEjercicios();
    this.listar();
    this.rutina['numEjers'] = '0';
  }

  ngOnInit() {
  }



  guardar() {
    if (this.new == true) {
      this.rutina.estado = 'Activo';
      this.rutina.fechaCreacion = this.getFechaActual();
      this.rutina.ejercicios = this.listEjerRutina;

      this.nuevaRutina();

      console.log(this.rutina);
    } else {
      this._rutinaService.editarRutina(this.rutinaEdit, this.rutinaEdit['_id']).subscribe(
        data => {
          console.log(data, 'modificar taty')
          this.listar();
          this.closeModal();
          this.Success('Rutina editada OK !!');
        },
        error => {
          console.log(error);
        });
    }


  }



  Success(title: any) {
    this._toasterService.Success(title);
  }
  closeModal() {
    //$('#dataModal').modal('hide');
  }

  //Metodo guardar entrenamiento
  nuevaRutina() {
    this._rutinaService.nuevaRutina(this.rutina).subscribe(
      data => {

        this._toasterService.Success('Rutina guardada OK !!');

      },
      error => {
        console.log('ERROR');
        this._toasterService.Error(' Error al guardar !!');
        console.log(error);


      }

    );
  }

  listar() {
    this.rutinas = [];

    this._rutinaService.consultarRutinas()
      .subscribe(
        data => {

          console.log(data)

          for (let key$ in data) {
            let rutina = data[key$];
            rutina['_id'] = key$;
            rutina['numEjers'] = rutina.ejercicios.length;
            this.rutinas.push(rutina);
          }

          this.dataSource.data = this.rutinas;
          this.dataSource.paginator = this.paginator;

          console.log(this.dataSource.data)

        },
        error => {
          console.log(error);
        }

      );

  }

  newModal() {
    this.new = true;
  }


  //Metodo listar entrenamientos
  listarEjercicios() {

    this._entrenamientoService.consultarEntrenamientos()
      .subscribe(
        data => {
          this.entrenamientos = [];
          for (let key$ in data) {
            let entrenamiento = data[key$];
            entrenamiento['_id'] = key$;
            this.entrenamientos.push(entrenamiento);
            this.getUrlsImg(entrenamiento);
          }

          console.log(this.entrenamientos)

        },
        error => {
          console.log(error);
        }

      );

  }

  addEjercicio(event: any) {
    //console.log(this.listaEjercicios);
    this.listEjerRutina = [];

    //this.entrenamientos=[];
    for (let $key in this.listaEjercicios) {

      let data: any = {
        ejercicio: this.listaEjercicios[$key],
        series: '',
        repeticiones: '',
        descanso: ''
      }
      this.listEjerRutina.push(data);
    }
    console.log(this.listaEjercicios)


  }


  //Obtencion de fecha
  getFechaActual() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    dd = this.addZero(dd);
    mm = this.addZero(mm);

    let fecha = {
      dd: dd,
      mm: mm,
      yyyy: yyyy
    }

    return fecha;
  }
  //Obtencion de fecha
  addZero(i: any) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }


  //Devuelve la url de la imagen
  getUrlsImg(deportista: any) {
    deportista['idImg'] = deportista['imagen'];
    this._entrenamientoService.downloadUrl(deportista['imagen']).subscribe(
      data => {
        deportista['imagen'] = data;

      },
      error => {
        console.log('ERROR');
        console.log(error);

      }
    );

    deportista['imagen'] = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';

  }





  editModal(rutina: Rutina) {
    this.new = false;
    console.log(this.new);

    this.listaEjerciciosEdit = [];
    this.rutinaEdit = rutina;
    this.listaEjercicios = this.rutinaEdit['ejercicios'];


    this.listEjerRutina = this.rutinaEdit.ejercicios;

    console.log(this.listaEjercicios);
    console.log(this.rutinaEdit);

    //this.itemsInstrucciones=entrenamiento.instruccion;

  }

  cargarObjectBaja(rutina: Rutina, event:any) {
    this.indiceData= rutina['_id'];
    this.rutinaEdit= Object.assign({}, rutina);
    this.eventData = event;

    if(rutina['estado'] == 'Activo'){
      this.titleConfirm='Esta seguro de dar de baja esta rutina?';
  
    }else{
      this.titleConfirm='Esta seguro de dar de alta esta rutina?';
  
    }
  }

  darBaja(){
    
    this.loadingTrash();
    let title="";

    if(this.rutinaEdit.estado == 'Activo'){
      this.rutinaEdit.estado = 'Inactivo';
      title = 'Rutina dada de baja OK !!';
    }else{
      this.rutinaEdit.estado = 'Activo';
      title = 'Rutina dada de alta OK !!';
    }
    
    this._rutinaService.darBajaRutina(this.rutinaEdit,this.rutinaEdit["_id"]).subscribe(
      data=>{
        //this.refresh(this.deportistaEdit);
        this.listar();
        this.Success(title);
        this.loadTrash.hide();
        this.trash.show(); 
      },
      error=>{
        console.log(error);
        this.loadTrash.hide();
        this.trash.show(); 
      }
      
    );
  }

  loadingTrash(){
    this.trash = $(this.eventData.target).parent().find(`#${this.indiceData}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();
    
    this.trash.hide();
    this.loadTrash.show();
  }

}
