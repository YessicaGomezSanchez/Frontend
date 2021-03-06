import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class TaxisService {
  URL = environment.URL + `taxis`
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getAllTaxis(): Observable<any> {
    return this.http.get(this.URL).pipe(map((res: any) => {
      return res;
    }))
  }
  postTaxis(form:any){
    return this.http.post(this.URL, form, { headers: this.headers }).pipe(map((res: any) => {
      return res;
    }))
  }
  getTaxi(placa: any): Observable<any> {
    return this.http.get(this.URL + `/${placa}/`, { headers: this.headers }).pipe(map((res: any) => {
      return res;
    }))
  }
  putTaxi(form: any) {
    return this.http.put(this.URL + `/${form.placa}/`, form, { headers: this.headers }).pipe(map((res: any) => {
      return res;
    }))
  }
}