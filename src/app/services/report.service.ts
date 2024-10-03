import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Repair } from '../interfaces/repair';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  http = inject(HttpClient);
  
  getRepairs(){

    const url = 'http://localhost:8080/technico/appPath/repair/findAll';

    return this.http.get<Repair[]>(url);
  }
}
