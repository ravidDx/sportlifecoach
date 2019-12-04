import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { Router } from '@angular/router';
import { EjericicosService } from 'src/app/servicios/ejericicos.service';


@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {


  ejercicio: any = {}

  ejercicios: any[] = [];
  ejerciciosCopy: any[] = [];
  tiposEntrenamiento: any = [];
  tipo1 = '';
  constructor(private _ejercicioService: EjericicosService, private _storageService: StorageService,
    private _categoriaService: CategoriasService,
    private _router: Router) {
    this.getEjercicios();
  }

  ngOnInit() {
  }


  //Metodo listar entrenamientos
  getEjercicios() {
    console.log('get Ejercicios');
    this._ejercicioService.consultarEjercicios().subscribe(
      data => {
        console.log(data);
        this.ejerciciosCopy = data;
        console.log(this.ejerciciosCopy);

        this.getCategoriasEntrenamiento();


      }, error => {
        console.log(error);
      });

  }


  getCategoriasEntrenamiento() {
    this.tiposEntrenamiento = [];
    this._categoriaService.getCategoriasEntrenamiento()
      .subscribe(
        data => {
          for (let key$ in data) {
            let catgNew = data[key$];
            catgNew['id'] = key$;
            catgNew['longitud'] = 0;
           
            for (let pos in this.ejerciciosCopy) {
              let obj = this.ejerciciosCopy[pos];
              if (obj['tipo'] == catgNew['nombre']) {
                catgNew['longitud'] = catgNew['longitud'] + 1;
              }
            }

            this.tiposEntrenamiento.push(catgNew);
          }
          // this.getEjercicios_x_tipo(this.tiposEntrenamiento['0']['nombre']);
          this.tipo1 = this.tiposEntrenamiento['0']['nombre'];
          //console.log(this.tiposEntrenamiento)

        },
        error => {
          console.log(error);
        }

      );

  }

  getEjercicios_x_tipo(tipo: any) {
    this.ejercicios = [];

    var _this = this;
    console.log(tipo);
    this.ejerciciosCopy.forEach(function (item, indice, array) {
      if (tipo == item.tipo) {
        item['posicion'] = indice;
        _this.ejercicios.push(item);

      }

    });


  }

  viewItem(item:any){
    var id =  item['_id'];
    //console.log(id);
    this._router.navigate(['/ejercicio', id ])
  }




}
