import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { Variedad } from '../models/variedad';
import { ListaProductosService } from './service/lista-productos.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  public ListProductos: Producto[]=[];
  public ListProductosRef: Producto[]=[];
  public ListProductosfilter: Producto[]=[];
  public page:number = 1;
	public pageSize:number = 5;
	public collectionSize:number = 0;

  constructor(private listaProductosService: ListaProductosService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.listaProductosService.getProductos().subscribe(
      (resp)=>{
        this.ListProductosRef = resp;   
        this.collectionSize = this.ListProductosRef.length;
        this.refreshProductos();     
      },      
      error => console.log(error),      
    );    
  }

  refreshProductos() {
		this.ListProductos = this.ListProductosRef.map((producto, i) => ({...producto })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  filterNombre(event:any){
    this.ListProductosfilter = this.ListProductosRef.filter((x)=> x.nombre?.includes(event.target.value));   
    this.collectionSize = this.ListProductosfilter.length;
    this.ListProductos = this.ListProductosfilter.map((producto, i) => ({...producto })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }

  filterEspecie(event:any){
    this.ListProductosfilter = this.ListProductosRef.filter((x)=> x.especie?.includes(event.target.value));   
    this.collectionSize = this.ListProductosfilter.length;
    this.ListProductos = this.ListProductosfilter.map((producto, i) => ({...producto })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }

  filterVariedad(event:any){     
    this.ListProductosfilter = this.ListProductosRef.filter((x)=> x.variedades?.filter((y)=> y.variedad?.includes(event.target.value)));   
    this.collectionSize = this.ListProductosfilter.length;
    this.ListProductos = this.ListProductosfilter.map((producto, i) => ({...producto })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }

  filterGrado(event:any){
    this.ListProductosfilter = this.ListProductosRef.filter((x)=> x.grados?.filter((y)=> y.grado?.includes(event.target.value)));   
    this.collectionSize = this.ListProductosfilter.length;
    this.ListProductos = this.ListProductosfilter.map((producto, i) => ({...producto })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
  }

}
