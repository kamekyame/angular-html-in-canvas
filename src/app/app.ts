import { Component, signal } from '@angular/core';
import { HtmlInCanvas } from './html-in-canvas/html-in-canvas';

@Component({
  selector: 'app-root',
  imports: [HtmlInCanvas],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-html-in-canvas');
}
