import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlipboardComponent } from "./components/flipboard/flipboard.component";
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlipboardComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'flipboard';
}
