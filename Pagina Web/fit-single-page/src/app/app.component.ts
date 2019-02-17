import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  //config: any;
  //fullpage_api: any;

  /*

  constructor() {

    // for more details on config options please visit fullPage.js docs
    this.config = {

      // fullpage options
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['home', 'about', 'thirdPage', 'fourthPage', 'lastPage'],
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      afterLoad: (origin, destination, direction) => {
        console.log(origin.index);
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }*/

}
