import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {  

  constructor(private http: HttpClient) { }

  public getMenu(): Observable<any> {
    return this.http.get(environment.urlApi+'Menu');
  }

}
