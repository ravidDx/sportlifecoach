import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var  $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posi: Boolean = false;
  constructor() {   }

  ngOnInit() {
    
  }

  onClick( ) {
    (function($) {
      //desplazamiento suave
      $(document).ready(function() {
        $('a[href^="#"]:not([href="#"])').click(function() {
          var destino = $(this.hash);
          if (destino.length == 0) {
            destino = $('a[name="' + this.hash.substr(1) + '"]');
          }
          if (destino.length == 0) {
            destino = $('html');
          }
          $('html, body').animate({ scrollTop: destino.offset().top -70 }, 900), "easeInOutExpo";
          return false;
        });
      });
      // Activate scrollspy to add active class to navbar items on scroll
      $('body').scrollspy({
        target: '#mainNav',
        offset: 80
      });
    })(jQuery);
  }

  click() {
    (function($) {
      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
      });
    })(jQuery);
  }
}
