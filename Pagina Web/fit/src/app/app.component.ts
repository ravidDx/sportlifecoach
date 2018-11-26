import { Component } from '@angular/core';
declare var jQuery:any;
declare var  $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fit';

  constructor() {
    (function($) {
      
      // Scroll to top button appear
        $(document).scroll(function() {
          var scrollDistance = $(this).scrollTop();
          if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
          } else {
            $('.scroll-to-top').fadeOut();
          }
        });
    })(jQuery);
  }

 

}
