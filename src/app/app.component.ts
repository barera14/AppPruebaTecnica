import { Component } from '@angular/core';
import { AppMenuService } from './service/app-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: any  = "Adicionar Productos";
  public ListMenu: any = null;  
  

  constructor(private appMenuServices: AppMenuService){}

  ngOnInit(): void {
  
    this.appMenuServices.getMenu().subscribe(
      (resp)=>{
        this.ListMenu = resp;        
      },      
      error => console.log(error),      
    );    
  }

  clickOption(nombre: any){
    this.title = nombre;
  }


}
