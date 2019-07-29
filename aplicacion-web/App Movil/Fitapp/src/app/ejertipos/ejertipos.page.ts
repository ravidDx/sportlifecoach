import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejertipos',
  templateUrl: './ejertipos.page.html',
  styleUrls: ['./ejertipos.page.scss'],
})
export class EjertiposPage implements OnInit {

  sliderConfig = {
    spaceBetween: 5,
    centeredSlide: true,
    slidesPerView: 1.6
  };
  
  constructor() { }

  ngOnInit() {
  }

}
