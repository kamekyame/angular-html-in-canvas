import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HtmlInCanvas } from "./html-in-canvas/html-in-canvas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HtmlInCanvas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-html-in-canvas');
}
