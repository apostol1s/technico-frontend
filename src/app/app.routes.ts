import { Routes } from '@angular/router';
import { ReadOwnerComponent } from './owner/read-owner/read-owner.component';

export const routes: Routes = [
    {path: "read-owner", component: ReadOwnerComponent},
    {path: '', redirectTo: 'read-owner', pathMatch: 'full'}, 
];
