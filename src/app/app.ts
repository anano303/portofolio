import { Component } from '@angular/core';

import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { HomeComponent } from './features/home/home';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HomeComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
