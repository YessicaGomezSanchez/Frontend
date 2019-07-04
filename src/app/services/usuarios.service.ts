import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
}) 

export class UsuariosService {
  URL = environment.URL + `usuarios`
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor( private http: HttpClient) {
   }

  
  saveUser(form){
    return this.http.post(this.URL, form, {headers: this.headers}).pipe(map((res:any)=>{      
      return res;
    }))
  }

  getUsuario(id: any) :Observable <any> {
    return this.http.get(this.URL+`/${id}/`,{headers: this.headers}).pipe(map((res:any)=>{      
      return res;
    }))
  }
  getAllUsuario() :Observable <any> {
    return this.http.get(this.URL).pipe(map((res: any) => {
      return res;
    }))
  }

  putUsuario(form){
    return this.http.put(this.URL+`/${form.numero_contacto}/`,form, {headers: this.headers}).pipe(map((res:any)=>{      
      return res;
    }))
  }
}
