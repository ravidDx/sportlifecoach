import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.page.html',
  styleUrls: ['./dietas.page.scss'],
})
export class DietasPage implements OnInit {

  list: Array<number> = [1, 2 , 3 , 4];

  sliderConfig = {
    spaceBetween: 10,
    centeredSlide: true,
    slidesPerView: 1.6
  };

  constructor() { }

  ngOnInit() {
  }

}
