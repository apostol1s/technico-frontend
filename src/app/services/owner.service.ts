import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Owner } from '../interfaces/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  http = inject(HttpClient);

  getOwners(){

    const url = 'http://localhost:8080/technico/appPath/owner/findAll';

    return this.http.get<Owner[]>(url);
  }

  sendData(data: any){

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('crossDomain', 'true')

    const url = 'http://localhost:8080/technico/appPath/owner/create';

    return this.http.post(url, JSON.stringify(data), {headers: headers})
    .pipe(
      retry(1),
      catchError(error => throwError(() => 'Something is wrong...'))
    );
  }

  deleteOwner(id: number) {
    const url = `http://localhost:8080/technico/appPath/owner/hardDelete/${id}`;
  
    return this.http.delete(url)
      .pipe(
        retry(1),
        catchError(error => throwError(() => 'Something went wrong while deleting...'))
      );
  }

}
