import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  
  public getVariedad(): Observable<any> {    
    return this.http.get(environment.urlApi+'Variedades');
  }

  public getColor(): Observable<any> {
    return this.http.get(environment.urlApi+'Colores');
  }

  public getGrados(): Observable<any> {
    return this.http.get(environment.urlApi+'Grados');
  }
  

  public postSaveProductos(producto:Producto): Observable<any> {
    return this.http.post(environment.urlApi+'Productos',producto);
  }
}
