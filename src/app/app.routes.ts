import { Routes } from '@angular/router';
import { ReadOwnerComponent } from './owner/read-owner/read-owner.component';
import { CreateOwnerComponent } from './owner/create-owner/create-owner.component';
import { UpdateOwnerComponent } from './owner/update-owner/update-owner.component';
import { ReportComponent } from './report/report.component';

export const routes: Routes = [
    {path: "read-owner", component: ReadOwnerComponent},
    {path: '', redirectTo: 'read-owner', pathMatch: 'full'}, 
    {path: 'create-owner', component: CreateOwnerComponent},
    {path: 'update-owner/:id', component: UpdateOwnerComponent},
    {path: 'report', component: ReportComponent}
];
