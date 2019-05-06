import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
    URL = environment.URL + `sesion`
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {
  }

  guardarSesion(sesion) {
    console.log(sesion);
    return this.http.post(this.URL, sesion, { headers: this.headers }).subscribe(
      data => {
        console.log("POST Request is successful ", data);
        console.log(data);
      },
      error => {
        console.log("Error", error.error.message);
      }
    );
  }

  getSesion(correo: any): Observable<any> {
    return this.http.get(this.URL + `/${correo}/`, { headers: this.headers }).pipe(map((res: any) => {
      return res;
    }))
  }
  
  getAllSesion(): Observable<any> {
    return this.http.get(this.URL).pipe(map((res: any) => {
      return res;
    }))
  }

  putSesion(form){
    return this.http.post(this.URL+ `/${form.correo}/`, form, {headers: this.headers}).subscribe(
      data => {
        console.log("PUT Request is successful ", data);
      },
      error => {

        console.log("Error", error);

      }

    );
  }

}
