import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './layout/header/header';
import { Main } from './layout/main/main';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Main, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
