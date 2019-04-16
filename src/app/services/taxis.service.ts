import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaxisService {

  constructor(private http: HttpClient) { }

  // getTaxis(): any {
  //   return this.getQuery('taxis').pipe(map( data => data ));
  // }

  // getQuery(query: string) {
  //   const URL = environment.URL + `${ query }`;
  //   return this.http.get(URL);
  // }

  getTaxis(): Observable<any> {
    const URL = environment.URL + `taxis`
    return this.http.get(URL).pipe(map((res: any) => {
      return res;
    }))
  }

  postTaxis(form){
    const  headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const URL = environment.URL + `taxis`
    return this.http.post<Form>(URL, form, {headers}).subscribe(
      data => {
        console.log("POST Request is successful ", data);
        console.log(data);
      },
      error => {

        console.log("Error", error);

      }

    );
  }

}