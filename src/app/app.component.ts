import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    this.ngxService.start(); 
    setTimeout(() => {
      this.ngxService.stop(); 
    }, 3000);
    this.ngxService.startBackground("do-background-things");
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01"); 
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01"); 
    }, 3000);
  }
}
