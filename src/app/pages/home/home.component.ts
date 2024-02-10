import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images: string[] = [
    'http://localhost:4200/assets/pexels-pixabay-36762.jpg',
    'http://localhost:4200/assets/pexels-pixabay-60597.jpg',
    'http://localhost:4200/assets/pexels-pixabay-326055.jpg'
];
}
