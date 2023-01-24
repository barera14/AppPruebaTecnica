import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ListaProductosService {

  constructor(private http: HttpClient) { }

  public getProductos(): Observable<Producto[]> {    
    return this.http.get<Producto[]>(environment.urlApi+'Productos');
  }
}
