import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReadOwnerComponent } from './owner/read-owner/read-owner.component';
import { CreateOwnerComponent } from './owner/create-owner/create-owner.component';
import { UpdateOwnerComponent } from './owner/update-owner/update-owner.component';
import { ReportComponent } from './report/report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReadOwnerComponent,
    CreateOwnerComponent,
    UpdateOwnerComponent,
    ReportComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'technico-frontend';
}
