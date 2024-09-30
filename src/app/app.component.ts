import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReadOwnerComponent } from './owner/read-owner/read-owner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReadOwnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'technico-frontend';
}
